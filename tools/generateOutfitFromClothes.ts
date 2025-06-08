import OpenAI from 'openai';

interface ClothingItem {
  id: number;
  type: string | null;
  color: string | null;
  season: string | null;
  material: string | null;
  imageUrl: string | null;
}

interface AIOutfitItem {
  id: number;
  positionX: number;
  positionY: number;
}

export async function generateOutfitFromClothes(
  clothes: ClothingItem[],
  prompt: string,
  apiKey?: string
): Promise<AIOutfitItem[]> {
  const key = apiKey || process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: key });

  const systemPrompt = `
Ты — виртуальный стилист. Пользователь прислал список доступной одежды и описание ситуации или пожеланий. 
Твоя задача — выбрать из этого списка одежду, которая лучше всего подходит под запрос. Образ должен сочетаться друг с другом и запросом, а так же иметь хотя бы 1 тип верхней одежды, штанов и обуви. Если необходимо, то добавь аксессуары.
Верни только список ID выбранных вещей, а также примерные координаты для расположения на холсте по центру(0–440 по X и Y).

Пример ответа:
[
  { "id": 3, "positionX": 40, "positionY": 20 },
  { "id": 7, "positionX": 75, "positionY": 50 }
]
`;
// Если ничего не подходит — верни пустой массив.
// Если здесь категорически не хватает какой то вещи для завершения образа, напиши в формате 
//     { "advice": " Здесь бы отлично подошла вещь" }
// что сюда следовало бы добавить, иначе оставь это поле пустым

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Вот список одежды:\n${JSON.stringify(clothes, null, 2)}\n\nЗапрос пользователя: "${prompt}"`
      }
    ],
  });

  const content = response.choices[0].message.content;

  if (!content) throw new Error("Пустой ответ от OpenAI");

  return JSON.parse(content);
}
