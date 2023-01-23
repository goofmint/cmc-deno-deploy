import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

const api_user = Deno.env.get('API_USER');
const api_key = Deno.env.get('API_KEY');
const from = {
	name: '管理者',
	address: 'info@mx.devcle.com',
};
const url = 'https://sandbox.smtps.jp/api/v2/emails/send.json';
// const url = 'https://post.deno.dev';
serve(async (req: Request) => {
	const json = await req.json();
	console.log(JSON.stringify(json));
  const to = [{
		name: json.to.name,
		address: json.to.address,
	}];
  const subject = 'テストメール';
  const text = `このメールはテストメールです。
  改行を入れます。

  ----
  フッターです
  `;
  const params = { api_user, api_key, to, from, subject, text };
  try {
    // 送信処理
    const res: Response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			return new Response(res.body);
		} else {
			return new Response(`Error: ${res.body}`, {
				status: res.status,
			});
		}
  } catch (e) {
    // エラーの場合
		console.error(e);
		return new Response(JSON.stringify(e), {
			status: e.status,
		});
  }
});