const BlogMd = require("@blogmd/core").default;
const { Basic } = require("@blogmd/styles");

const [style, template] = Basic.useStyle(); // @blogmd/styles/basicを用いる

const blogmd = new BlogMd({
	articleDir: "./articles",
	outDir: "./public",
	styleFile: style,
	template: template
});
blogmd.build();
blogmd.buildIndex();