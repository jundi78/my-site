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
      // Key by series_id (stable ASCII string) not series name (Arabic).
      // This allows renaming the display name freely without breaking lookups.
      const id = post.data.series_id;
      if (!id) return;
      if (!grouped[id]) grouped[id] = [];
      grouped[id].push(post);
    });

    Object.keys(grouped).forEach((id) => {
      grouped[id].sort((a, b) => (a.data.seriesOrder || 0) - (b.data.seriesOrder || 0));
    });

    return grouped;
  });

  // Filter to look up series posts by id from the seriesPosts collection.
  // Usage in Nunjucks: collections.seriesPosts | getSeriesPosts(s.id)
  // Using a JS filter avoids Nunjucks dynamic bracket-notation issues.
  eleventyConfig.addFilter("getSeriesPosts", function (seriesPosts, id) {
    if (!seriesPosts || !id) return [];
    return seriesPosts[id] || [];
  });

  // YouTube embed shortcode
  // Usage in any .md post: {% youtube "VIDEO_ID" %}
  // The VIDEO_ID is the part after ?v= in the YouTube URL.
  // Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ → {% youtube "dQw4w9WgXcQ" %}
  // Renders a fully responsive 16:9 iframe styled via .youtube-embed in style.css.
  eleventyConfig.addShortcode("youtube", function (videoId) {
    return `<div class="youtube-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/${videoId}"
    title="YouTube video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>`;
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
