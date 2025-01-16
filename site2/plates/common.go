package plates

import (
	"regexp"
	"strings"
	"time"
)

var nonAlphanumericSpaces = regexp.MustCompile(`[^a-z0-9- ]`)
var leadingZeroes = regexp.MustCompile(`^0+`)

func projectThumbnail(name string) string {
	nameCleaned := nonAlphanumericSpaces.ReplaceAllString(strings.ToLower(name), "")
	nameCleaned = strings.ReplaceAll(nameCleaned, " ", "-")
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

func formatFullBlogDate(inputDate string) string {
	// Parse the input date string into a time.Time object
	date, err := time.Parse("2006-01-02", inputDate)
	if err != nil {
		return "Somewhen"
	}

	// Format the date to a human-readable string
	formattedDate := date.Format("January 2, 2006")
	return formattedDate
}
