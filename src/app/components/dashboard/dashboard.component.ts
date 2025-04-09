import { Component } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:  [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTextValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
    
  }
  getAllTask() {
    this.crudService.getAllTasks().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('unable to get list');
      }
    );
  }
  addTask() {
    this.taskObj.taskName = this.addTextValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTextValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }
  editTask() {
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('unable to edit task');
      }
    );
  }

  deleteTask(eTask: Task) {
    this.crudService.deleteTask(eTask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('unable to delete task');
      }
    );
  }
}
