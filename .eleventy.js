module.exports = function (eleventyConfig) {
  // Copy static files as-is
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin/index.html");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: false,
  });

  // Default: full Arabic date
  eleventyConfig.addFilter("date", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return String(date);
    return d.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Zero-padded month: "03"
  eleventyConfig.addFilter("dateMonth", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    return String(d.getUTCMonth() + 1).padStart(2, "0");
  });

  // Four-digit year: "2026"
  eleventyConfig.addFilter("dateYear", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    return String(d.getUTCFullYear());
  });

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
