"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ThumbnailGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends ProgressEvent {
    target: FileReaderEventTarget;
}

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const target = e.target as FileReaderEventTarget;
            setReferenceImage(target.result);
        };
        reader.readAsDataURL(file);
    }
};

  const generateThumbnail = async () => {
    setLoading(true);
    // Here you would integrate with your chosen AI service
    // For example, using Stability AI:
    // const result = await stability.generate({
    //   prompt,
    //   width: 1280,
    //   height: 720,
    //   reference_image: referenceImage
    // });
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>YouTube Thumbnail Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Description/Prompt
            </label>
            <textarea
              className="w-full p-2 border rounded-md h-32"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your desired thumbnail (e.g., 'Tech tutorial thumbnail with glowing circuits and modern design')"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reference Images
            </label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Upload reference images
                </span>
              </label>
            </div>
          </div>

          {referenceImage && (
            <div className="mt-4">
              <img
                src={referenceImage}
                alt="Reference"
                className="max-h-40 rounded-md"
              />
            </div>
          )}

          <button
            onClick={generateThumbnail}
            disabled={loading || !prompt}
            className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-700"
          >
            {loading ? 'Generating...' : 'Generate Thumbnail'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThumbnailGenerator;