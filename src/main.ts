import * as fs from 'fs/promises';
import markdownToHtml from 'zenn-markdown-html';

import { MetadataBlogPost, blogTemplate } from './utils';

(async () => {
	// publicディレクトリを作成
	await fs.mkdir("./public");
	// articleディレクトリを探索
	const articleList = await fs.readdir("./articles");
	let cardList: string[] = [];
	for (let article of articleList) {
		const srcDir = `./articles/${article}`;
		// 記事データの読み込み
		const markdown = await fs.readFile(`${srcDir}/article.md`, {
			encoding: "utf8"
		});
		// JSONLDの読み込み
		const jsonld = await fs.readFile(`${srcDir}/meta.jsonld`, {
			encoding: "utf8"
		});
		const metadata: MetadataBlogPost = JSON.parse(jsonld);
		// HTMLを作成しファイルに出力
		const html = blogTemplate(metadata, markdownToHtml(markdown));
		const dstDir = `./public/${article}`
		await fs.mkdir(dstDir);
		await fs.writeFile(`${dstDir}/index.html`, html);
		// 画像データなどをコピー
		fs.readdir(srcDir).then(files => {
			files.forEach(fileName => {
				if (fileName.match(/.(md|jsonld)$/) === null) {
					fs.copyFile(`${srcDir}/${fileName}`, `${dstDir}/${fileName}`,);
				}
			});
		});
		// 記事一覧を作成
		const card = `<small>${metadata.datePublished}</small><br/><p><a href="./${article}/index.html">${metadata.headline}</a>by ${metadata.author.name}</p>`;
		cardList.push(card);
	};
	// 記事一覧ページを作成
	fs.writeFile("./public/index.html", cardList.join("\n"));
})();
