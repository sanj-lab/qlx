import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface DroppedFile extends File {
  id: string;
}

interface DragDropZoneProps {
  onFilesChange: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  className?: string;
}

export function DragDropZone({
  onFilesChange,
  acceptedFileTypes = ['.pdf', '.txt', '.sol', '.md'],
  maxFiles = 10,
  className
}: DragDropZoneProps) {
  const [files, setFiles] = useState<DroppedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  }, [files, maxFiles, onFilesChange]);

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      if (type === '.pdf') return { ...acc, 'application/pdf': [] };
      if (type === '.docx') return { ...acc, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [] };
      if (type === '.txt') return { ...acc, 'text/plain': [] };
      if (type === '.sol') return { ...acc, 'text/plain': [] };
      if (type === '.md') return { ...acc, 'text/markdown': [] };
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    multiple: maxFiles > 1
  });

  const getFileIcon = (fileName: string) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    return <File className="w-4 h-4" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          "hover:border-primary/50 hover:bg-muted/50",
          isDragActive && "border-primary bg-primary/5",
          files.length > 0 && "border-primary/30"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop files here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium">Drop files here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-2">
              Supports: {acceptedFileTypes.join(', ')} (max {maxFiles} files)
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files ({files.length})</h4>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(file.name)}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}