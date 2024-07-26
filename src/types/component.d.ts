interface FileObject {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: {
    uid: string;
  };
  status: string;
}

interface ImageComponentProps {
  file: FileObject;
}
