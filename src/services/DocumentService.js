import BaseService from './BaseService';

export default class DocumentService extends BaseService {
  entity = 'documents';

  upload(documentData) {
    const token = localStorage.getItem('token');

    const uploadFormData = new FormData();
    uploadFormData.append('title', documentData.title);
    uploadFormData.append('document', documentData.document);

    if (documentData.type) uploadFormData.append('type', documentData.type);
    if (documentData.userId) uploadFormData.append('userId', documentData.userId);
    if (documentData.companyId) uploadFormData.append('companyId', documentData.companyId);

    return fetch(process.env.REACT_APP_API_HOST + '/' + this.entity, {
      method: 'POST',
      body: uploadFormData,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const documentService = new DocumentService();
