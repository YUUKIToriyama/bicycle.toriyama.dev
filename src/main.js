const BlogMd = require("@blogmd/core").default;

const blogmd = new BlogMd({
	articleDir: "./articles",
	outDir: "./public",
	styleFile: "./src/basic.scss"
});
blogmd.build();
blogmd.buildIndex();