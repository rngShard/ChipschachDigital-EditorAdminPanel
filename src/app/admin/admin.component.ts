import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Level } from './level';
import { LevelService } from '../level.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [`
    table {
      width: 100%;
    }
    .mat-form-field {
      font-size: 14px;
      width: 100%;
    } 
    td, th {
      width: 25%;
    }
  `]
})
export class AdminComponent implements OnInit {
  private levels: Level[];

  displayedColumns: string[] = ['_id', 'type', 'reviewStatus'];
  dataSource: MatTableDataSource<Level>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private levelService: LevelService) {
    this.levels = [];
    this.dataSource = new MatTableDataSource();
  }

  public ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.levelService.getLevels().subscribe((levels: Level[]) => {
      console.log('Retrieved levels: ', levels);
      this.levels = levels;
      this.updateDataSource();
    })
  }

  updateDataSource() {
    this.dataSource.data = this.levels;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


