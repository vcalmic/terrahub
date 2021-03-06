'use strict';

const fse = require('fs-extra');
const { config } = require('./parameters');
const Args = require('./helpers/args-parser');
const ConfigLoader = require('./config-loader');
const { toMd5, homePath } = require('./helpers/util');

/**
 * @abstract
 */
class AbstractCommand {
  /**
   * @param {Object} input
   * @param {Logger} logger
   */
  constructor(input, logger) {
    this.logger = logger;
    this._name = null;
    this._input = input;
    this._options = {};
    this._description = null;
    this._configLoader = new ConfigLoader();

    this.configure();
    this.initialize();
    this._addDefaultOptions();

    if (!this.getName()) {
      throw new Error('The command cannot have an empty name');
    }
  }

  /**
   * Globally available options
   * @private
   */
  _addDefaultOptions() {
    this
      .addOption('env', 'e', 'Workspace environment', String, config.env)
      .addOption('help', 'h', 'Show list of available commands', Boolean, false);
  }

  /**
   * Configure command name
   * @param {String} name
   * @returns {AbstractCommand}
   */
  setName(name) {
    this._name = name;

    return this;
  }

  /**
   * @returns {String}
   */
  getName() {
    return this._name;
  }

  /**
   * Configure command description
   * @param {String} description
   * @returns {AbstractCommand}
   */
  setDescription(description) {
    this._description = description;

    return this;
  }

  /**
   * @returns {String}
   */
  getDescription() {
    return this._description;
  }

  /**
   * Configure command option
   * @param {String} name
   * @param {String} shortcut
   * @param {String} description
   * @param {Object} type
   * @param {*} defaultValue
   * @returns {AbstractCommand}
   */
  addOption(name, shortcut, description, type = String, defaultValue = undefined) {
    this._options[name] = { name, shortcut, description, type, defaultValue };

    return this;
  }

  /**
   * Get option value
   * @param {String} name
   * @returns {*}
   */
  getOption(name) {
    if (!this._options.hasOwnProperty(name)) {
      return undefined;
    }

    const option = this._options[name];
    const rawValue = this._input[option.name] || this._input[option.shortcut] || option.defaultValue;

    return Args.convert(option.type, rawValue);
  }

  /**
   * Abstract configure method
   * @abstract
   */
  configure() {
    throw new Error('Implement configure() method...');
  }

  /**
   * Abstract initialize method (optional)
   */
  initialize() {}

  /**
   * Abstract run method
   * @abstract
   * @returns {Promise}
   */
  run() {
    return Promise.reject(new Error('Implement run() method...'));
  }

  /**
   * Command validation
   * @returns {Promise}
   */
  validate() {
    try {
      fse.readJsonSync(homePath('.terrahub.json'));
    } catch (error) {
      this.logger.error('Global `.terrahub.json` config is invalid. ' +
        `Please make sure file's content is parsing JSON lint successfully.`
      );
    }

    const required = Object.keys(this._options).filter(name => {
      return typeof this.getOption(name) === 'undefined';
    });

    if (required.length > 0) {
      return Promise.reject(
        new Error(`Missing required options: ${required.map(x => `--${x}`).join(', ')}`)
      );
    }

    return Promise.resolve();
  }

  /**
   * Get list of configuration files
   * @param {String|Boolean} dir
   * @returns {String[]}
   */
  listConfig(dir = false) {
    return this._configLoader.listConfig({
      dir: dir
    });
  }

  /**
   * Get list of configuration files for the specified environment
   * @param {String|Boolean} dir
   * @returns {String[]}
   */
  listCurrentEnvConfig(dir = false) {
    return this._configLoader.listConfig({
      dir: dir,
      env: 'specific'
    });
  }

  /**
   * Get list of configuration files for the specified environment
   * @param {String|Boolean} dir
   * @returns {String[]}
   */
  listAllEnvConfig(dir = false) {
    return this._configLoader.listConfig({
      dir: dir,
      env: 'every'
    });
  }

  /**
   * Get full consolidated config
   * @returns {Object}
   */
  getConfig() {
    return this._configLoader.getFullConfig();
  }

  /**
   * @returns {Object}
   */
  getProjectConfig() {
    return this._configLoader.getProjectConfig();
  }

  /**
   * @return {String|Boolean}
   */
  getAppPath() {
    return this._configLoader.appPath();
  }

  /**
   * @param {String} fullPath
   * @returns {String}
   */
  relativePath(fullPath) {
    return this._configLoader.relativePath(fullPath);
  }

  /**
   * Reload config-loader
   * @deprecated
   */
  reloadConfig() {
    this._configLoader = new ConfigLoader();
  }

  /**
   * @returns {String}
   */
  getFileName() {
    return this._configLoader.getFileName();
  }

  /**
   * @returns {String}
   */
  getDefaultFileName() {
    return this._configLoader.getDefaultFileName();
  }

  /**
   * @returns {String}
   */
  getProjectFormat() {
    return this._configLoader.getProjectFormat();
  }

  /**
   * Generate project code
   * @param {String} name
   * @returns {String}
   */
  getProjectCode(name) {
    return toMd5(name + Date.now().toString()).slice(0, 8);
  }
}

module.exports = AbstractCommand;
