package blog

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

var blog1 = `Foo: Bar
Date: Xyz

Content Portion
`

var blog2 = `Foo: Yes
Date: Xyz
  
![img1](media/image1.png)
`

func TestParsingImage(t *testing.T) {

	converted := convertBlogHtmlContent(blog2, "2020/blog2")
	assert.NotContains(t, converted, "Foo")
	assert.Contains(t, converted, `alt="img1"`)
	assert.Contains(t, converted, `src="/mysite2/blog-content/2020/media/image1.png"`)
}
