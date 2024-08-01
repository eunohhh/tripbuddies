import convertToWebP from '@/utils/common/convertToWebp';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('imageFile') as Blob;
    const texts = JSON.parse(formData.get('texts') as string);

    if (!file) {
        return NextResponse.json(
            { error: 'No file uploaded' },
            { status: 400 },
        );
    }

    const imageBuffer = await convertToWebP(file, 1080);

    const supabase = createClient();
    const filePath = `stories_${Date.now()}.webp`;

    if (!imageBuffer) {
        return NextResponse.json(
            { error: 'Image conversion failed' },
            { status: 401 },
        );
    }

    const { data, error } = await supabase.storage
        .from('stories')
        .upload(filePath, imageBuffer, { contentType: 'image/webp' });

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    const { data: publicUrlData } = await supabase.storage
        .from('stories')
        .getPublicUrl(filePath);

    const jsonb = JSON.stringify(texts);

    const payload = {
        story_media: publicUrlData.publicUrl,
        story_overlay: jsonb,
    };

    const { data: story, error: storyError } = await supabase
        .from('stories')
        .insert({ ...payload })
        .select();

    if (storyError) {
        console.error(storyError);
        return NextResponse.json(
            { error: storyError?.message },
            { status: 401 },
        );
    }

    return NextResponse.json(story, { status: 200 });
}
