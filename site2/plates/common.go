package plates

import (
	"regexp"
	"strings"
)

var nonAlphanumeric = regexp.MustCompile(`[^a-z0-9-]`)

func projectThumbnail(name string) string {
	nameCleaned := nonAlphanumeric.ReplaceAllString(strings.ToLower(name), "-")
	return "/mysite2/res/p-" + nameCleaned + ".png"
}
