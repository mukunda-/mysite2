package plates

import (
	"regexp"
	"strings"
)

var nonAlphanumeric = regexp.MustCompile(`[^a-z0-9-]`)
var leadingZeroes = regexp.MustCompile(`^0+`)

func projectThumbnail(name string) string {
	nameCleaned := nonAlphanumeric.ReplaceAllString(strings.ToLower(name), "-")
	return "/mysite2/res/p-" + nameCleaned + ".png"
}

func formatBlogDate(date string) string {
	if date == "" {
		return "Somewhen"
	}

	dateparts := strings.Split(date, "-")
	year := dateparts[0][2:]
	month := leadingZeroes.ReplaceAllString(dateparts[1], "")
	day := leadingZeroes.ReplaceAllString(dateparts[2], "")
	return month + "/" + day + "/" + year
}
