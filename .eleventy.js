module.exports = function (eleventyConfig) {
  // Copy static files as-is
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin/index.html");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: false,
  });

  // Main date filter — returns Arabic formatted date by default
  eleventyConfig.addFilter("date", function (date, format) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return String(date);

    // If a specific format string is requested, return that
    if (format === "MM") {
      return String(d.getMonth() + 1).padStart(2, "0");
    }
    if (format === "yyyy" || format === "YYYY") {
      return String(d.getFullYear());
    }
    if (format === "MM-yyyy") {
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
    }

    // Default: full Arabic date
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
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
