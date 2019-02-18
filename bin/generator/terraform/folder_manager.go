package terraform

import (
	"fmt"
	"io/ioutil"
	"os/exec"
)

func DownloadFromGit(url string) bool {
	fmt.Println("git clone " + url)
	cmd := exec.Command("git", "clone", url)
	if err := cmd.Run(); err != nil {
		fmt.Println(err)
		return false
	}
	fmt.Println("Success")
	return true
}

func DeleteFolder(url string) bool {
	fmt.Println("Delete folder " + url)
	cmd := exec.Command("rm", "-rf", url)
	if err := cmd.Run(); err != nil {
		fmt.Println(err)
		return false
	}
	fmt.Println("Success")
	return true
}

func DeleteFile(path string) {
	_, err := ioutil.ReadFile(path)
	if err == nil {
		cmd := exec.Command("rm", path)
		if err := cmd.Run(); err != nil {
			fmt.Println(err)
		}
	}
}

func CreateFolder(path string) {
	cmd := exec.Command("mkdir", path)
	if err := cmd.Run(); err != nil {
		fmt.Println(err)
	}
}