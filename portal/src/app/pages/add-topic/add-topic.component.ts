import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.css'
})
export class AddTopicComponent {
  isEdit: 'Update' | 'Add' | undefined;
class:any[]=[]
  data: any[] = [];
  subject: any[] = [];
  subjectList: any[] = [];
  chapterList: any[] = [];

  masterToAddOrEdit: any = {};
  masterToAddOrEditIndex: number = -1;
  p: number = 1;
  limit: number = 10;
  total: number = 0;
  
  masterName: string = 'Topic';
  constructor(
    private apiService: ApiService
  ) {
    
    this.getData()
  }
  ngOnInit() {
    this.getClass()
    this.getSubject(); 
    this.getChapter()
  }
  getClass() {
    this.apiService
      .get('class', {
        params: {
          page: 1,
          limit: 1000,
        },
      })
      .subscribe({
        next: (res: any) => {
          this.class = res.data;
          console.log('fgfvasyh', res.data);
        },
        error: (err: any) => {
          console.error('Error fetching classes:', err);
        },
      });
  }
  onClassChange(event: any) {
    const selectedClassId = event.target.value;
    
    if (selectedClassId) {
      this.getSubjectsByClass(selectedClassId);
    } else {
      this.subjectList = [];
      this.chapterList = [];
    }
  }
  getSubjectsByClass(classId: string) {
    this.apiService
      .get(`subject/classId/${classId}`) 
      .subscribe({
        next: (res: any) => {
          this.subjectList = res.data;
          console.log('Subjects fetched:', res.data);
        },
        error: (err: any) => {
          console.error('Error fetching subjects:', err);
        },
      });
  }
  onSubjectChange(event: any) {
    const selectedSubjectId = event.target.value;
    
    if (selectedSubjectId) {
      this.getChapterBySubject(selectedSubjectId);
    } else {
      this.chapterList = [];
    }
  }
  getChapterBySubject(subjectId: string) {
    this.apiService
      .get(`chapter/subjectId/${subjectId}`) 
      .subscribe({
        next: (res: any) => {
          this.chapterList = res.data;
          console.log('Chapters fetched:', res.data);
        },
        error: (err: any) => {
          console.error('Error fetching Chapters:', err);
        },
      });
  }

  getData() {
    this.apiService.get('topic', {
      params: {
        page: this.p,
        limit: this.limit
      }
    }).subscribe((data: any) => {
      this.data = data.data;
     
      this.total = data.meta.total;
      this.p = data.meta.current_page;
      this.limit = data.meta.per_page;
    });
  }
  getSubject() {
    this.apiService
      .get('subject', {
        params: {
          page: 1,
          limit: 1000,
        },
      })
      .subscribe({
        next: (res: any) => {
          this.subject = res.data;
          console.log('fgfvasyh', res.data);
        },
        error: (err: any) => {
          console.error('Error fetching subjects:', err);
        },
      });
  }
  getChapter() {
    this.apiService
      .get('chapter', {
        params: {
          page: 1,
          limit: 1000,
        },
      })
      .subscribe({
        next: (res: any) => {
          this.subject = res.data;
          console.log('fgfvasyh', res.data);
        },
        error: (err: any) => {
          console.error('Error fetching chapters:', err);
        },
      });
  }
  selectItemToEdit(index: number) {
    // this.masterToAddOrEdit = this.data[index];
    this.masterToAddOrEdit = Object.assign({}, this.data[index]);
    this.masterToAddOrEditIndex = index
    this.isEdit = 'Update';
  }
  selectItemToAdd() {
    this.masterToAddOrEdit = {};
    this.isEdit = 'Add';
  }
  addNewItem() {
    if (this.masterToAddOrEdit.name === '') {
      return;
    }
    this.apiService.post('topic', this.masterToAddOrEdit).subscribe((data: any) => {
      this.getData();
      this.resetMasterToAddOrEdit();
    });
  }
  resetMasterToAddOrEdit() {
    this.masterToAddOrEdit = {};
    this.masterToAddOrEditIndex = -1;
    this.isEdit = undefined;
  }
  editItem(index: number) {
    if (this.masterToAddOrEditIndex === -1) {
      return;
    }
    if (this.masterToAddOrEdit.name === '') {
      return;
    }
    if (confirm('Are you sure you want to update this item?')) {
      if (this.masterToAddOrEditIndex === -1) {
        return;
      }
      this.apiService.put(`topic/${this.masterToAddOrEdit._id}`, this.masterToAddOrEdit).subscribe((data: any) => {
        this.getData();
        this.resetMasterToAddOrEdit();
      });
    }
  }
  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.apiService.delete(`topic/${this.data[index]._id}`).subscribe((data: any) => {
        this.getData();
      });
    }
  }
  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement; // Cast the target to HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Get the first selected file
      this.masterToAddOrEdit.image = file; // Store the file in masterToAddOrEdit
    }
  }
}
