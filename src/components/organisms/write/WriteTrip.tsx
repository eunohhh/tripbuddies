import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import SlateEditor from '@/components/atoms/write/SlateEditor';
import React, { useState } from 'react';
import { Descendant } from 'slate';

const initialContent: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

type WriteTripProps = {
    buddyCounts: number;
};

export default function WriteTrip({ buddyCounts }: WriteTripProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState<Descendant[]>(initialContent);

    console.log(`정말로 되는지: ${buddyCounts}`);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (value: Descendant[]) => {
        setContent(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Todo: 게시글 작성 로직 추가
        console.log('Title:', title);
        console.log('Content:', JSON.stringify(content));
    };

    return (
        <div className="p-4">
            <header className="mb-5">
                <Left2xlBoldText text="모집 글을 작성해봐요!" />
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        대표 이미지
                    </label>
                    <button className="flex items-center justify-center w-20 h-20 bg-gray-200 border border-gray-300 rounded">
                        <span className="text-gray-400">📷</span>
                    </button>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        제목
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목"
                        maxLength={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    <span className="block text-right text-sm text-gray-500">{`${title.length}/20`}</span>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        글 내용
                    </label>
                    <SlateEditor
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        제출 테스트 버튼
                    </button>
                </div>
            </form>
        </div>
    );
}
