
import {UploadFile} from "antd";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IUpload {
  export interface File {
    file: UploadFile
    type: string
  }
}
