module.exports = function (eleventyConfig) {
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setInputDirectory(".");

  eleventyConfig.setTemplateFormats(["md"]);

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("projects");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("portfolio/portfolio.css");

  eleventyConfig.ignores.add("CLAUDE.md");
  eleventyConfig.ignores.add("scripts/**");
};
