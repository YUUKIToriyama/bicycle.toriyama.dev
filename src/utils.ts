export type MetadataBlogPost = {
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": string // ブログのURL
	},
	"headline": string, // 記事のタイトル
	"image": string, // 記事のトップ画像へのリンク
	"author": {
		"@type": "Person",
		"name": string, // 筆者の名前
		"url": string // 筆者のプロフィールページへのリンク
	},
	"publisher": {
		"@type": "Organization",
		"name": string, // 発行者の名前
		"logo": {
			"@type": "ImageObject",
			"url": string // ロゴのURL
		}
	},
	"datePublished": string, // 記事の作成日
	"dateModified": string // 記事の更新日
}

export const blogTemplate = (jsonld: MetadataBlogPost, article: string) => `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${jsonld.headline} | ${jsonld.publisher.name}</title>
	<script type="application/ld+json">${jsonld}</script>
	<link rel="stylesheet" href="../style.css" />
</head>
<body>
	<header>
		<h1>${jsonld.publisher.name}</h1>
	</header>
	<main>
		<article>
			<h1>${jsonld.headline}</h1>
			<p>${jsonld.datePublished}(更新:${jsonld.dateModified})
			${article}
		</article>
	</main>
	<footer>
		<small>bicycle.toriyama.dev is maintaied by <a href="${jsonld.author.url}">${jsonld.author.name}</a></small>
	</footer>
</body>
</html>`;