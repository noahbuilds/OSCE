import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassageService {
  currentPassage: any;

  passages: any[] = [];

  constructor() {
    /* this.passages = [
      {
        id: '',
        reference: '',
        stimulus: '',
        tags: [{ id: '', tagName: '' }],
        items: [
          { id: '', reference: '', stimulus: '' },
          { id: '', reference: '', stimulus: '' },
          { id: '', reference: '', stimulus: '' },
        ],
      },
      {
        id: '',
        reference: '',
        stimulus: '',
        tags: [{ id: '', tagName: '' }],
        items: [
          { id: '', reference: '', stimulus: '' },
          { id: '', reference: '', stimulus: '' },
        ],
      },
      {
        id: '',
        reference: '',
        stimulus: '',
        tags: [
          { id: '', tagName: '' },
          { id: '', tagName: '' },
          { id: '', tagName: '' },
        ],
        items: [{ id: '', reference: '', stimulus: '' }],
      },
    ]; */
  }

  savePassage(passage: any){
    this.passages.push(passage);
  }

  getAllPassages() {
    return this.passages;
  }

  getPassage(id: string) {
    return this.passages.filter(passage => passage.id === id);
  }

  deletePassage(index: number){
    return this.passages.splice(index, 1);
  }

  deleteAllPassages(){
    this.passages.splice(0, this.passages.length);
  }
}
