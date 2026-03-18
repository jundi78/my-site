module.exports = function (eleventyConfig) {
  // Copy static files as-is
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");

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

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
  };
};
