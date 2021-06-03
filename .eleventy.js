module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css"
  ]);

  eleventyConfig.addPassthroughCopy("projects");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("img");
};