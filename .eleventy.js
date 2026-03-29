module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin/index.html");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: false,
  });

  eleventyConfig.addFilter("date", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return String(date);
    return d.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("dateMonth", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return String(d.getUTCMonth() + 1).padStart(2, "0");
  });

  eleventyConfig.addFilter("dateYear", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return String(d.getUTCFullYear());
  });

  eleventyConfig.addFilter("dateISO", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addCollection("seriesPosts", function (api) {
    const posts = api.getFilteredByTag("posts");
    const grouped = {};

    posts.forEach((post) => {
      const s = post.data.series;
      if (!s) return;
      if (!grouped[s]) grouped[s] = [];
      grouped[s].push(post);
    });

    Object.keys(grouped).forEach((name) => {
      grouped[name].sort((a, b) => (a.data.seriesOrder || 0) - (b.data.seriesOrder || 0));
    });

    return grouped;
  });

  // Filter to look up series posts by name from the seriesPosts collection.
  // Usage: collections.seriesPosts | getSeriesPosts(s.name)
  // This is more reliable than bracket notation with Arabic keys in Nunjucks.
  eleventyConfig.addFilter("getSeriesPosts", function (seriesPosts, name) {
    if (!seriesPosts || !name) return [];
    return seriesPosts[name] || [];
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
