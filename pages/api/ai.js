export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so\'rovlar ruxsat etilgan' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.QWEN_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ text: "Xatolik: API kalit o'rnatilmagan." });
  }

  const systemMessage = `
Siz SafarBot, O'zbekistonliklar uchun sun'iy intellekt asosidagi sayyohlik yordamchisisiz.
Foydalanuvchi so'roviga asoslanib, batafsil kunlik marshrut tuzing.

So'rov: "${prompt}"

Aniqlang:
- Chiqish: Toshkent (agar aytilmagan bo'lsa)
- Manzil: masalan, Antalya, Dubay, Bangkok
- Kunlar: raqamini aniqlang
- Oila/bolalar? so'zlar: "oilam", "bolalar" → ha
- Byudjet: agar "arzon", "samarali" → o'rtacha; "komfort" → yuqori

Keyin quyidagilarni taklif qiling:
1. Parvoz yoki avtobus (taxminiy narx, vaqt)
2. Mehmonxona (bolalar uchun mos, O'zbekcha so'zlashuvchi xodimlar bor)
3. Har bir kunga dastur (soatlar bilan)
4. Oziq-ovqat (mahalliy taomlar, O'zbekcha taomlar bor joylar)
5. Viza talablari (O'zbek fuqarolari uchun)
6. Pul almashtirish maslahati

Javobni faqat O'zbek tilida ber, tablitsasiz, odobli uslubda.
  `;

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-max',
        input: { messages: [{ role: 'user', content: systemMessage }] },
        parameters: { temperature: 0.7, max_tokens: 1500 }
      })
    });

    if (!response.ok) throw new Error('API xatosi');

    const data = await response.json();
    res.status(200).json({ text: data.output?.text || "Reja tuzib bo'lmadi." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ text: "Tarmoq xatosi. Keyinroq urinib ko'ring." });
  }
}
