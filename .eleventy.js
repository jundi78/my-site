module.exports = function (eleventyConfig) {
  // Copy static files as-is
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin/index.html");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Allow any date format
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: false,
  });

  // Date filter for templates
  eleventyConfig.addFilter("date", function (date, format) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return date;
    return d.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Allow .njk files to output any extension (needed for config.yml.njk)
  eleventyConfig.addTemplateFormats("njk");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
