import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

const api_user = Deno.env.get('API_USER');
const api_key = Deno.env.get('API_KEY');
const from = {
	name: '管理者',
	address: 'info@mx.devcle.com',
};
const url = 'https://sandbox.smtps.jp/api/v2/emails/send.json';

serve((req: Request) => {
  const to = [{
    name: 'Atsushi',
    address: 'atsushi@moongift.jp'
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
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			return new Response(res.body);
		} else {
			return new Response(`Error: ${res.body}`);
		}
  } catch (e) {
    // エラーの場合
		return new Response(JSON.stringify(e));
  }
}