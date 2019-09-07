import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatDialog } from '@angular/material';

import { Level } from './level';
import { LevelService } from '../level.service';
import { BoardPreviewDialogComponent } from './boardPreviewDialog/board-preview-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private levels: Level[];

  displayedColumns: string[] = ['name_de', 'name_en', 'description_de', 'description_en', 'reviewStatus', 'dialog'];
  dataSource: MatTableDataSource<Level>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private levelService: LevelService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
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

  levelUpdateLangAttr(levelId: string, attr: string, lang: string, $event) {
    let newValue = $event.target.value;
    let mongoQuery = `{"$set":{"${attr}.${lang}":"${newValue}"}}`;
    this.levelService.updateLevel(levelId, mongoQuery).subscribe(res => {
      if (res.ok === 1) {
        console.log(`Changed ${attr} (${lang}) for ${levelId} to ${newValue}, response: `, res);
        this._snackBar.open("Wert erfolgreich geändert", "", {duration: 1000});
      } else {
        this._snackBar.open("FEHLER - Wert konnte nicht geändert werden", "", {duration: 2000});
      }
    });
  }
  levelUpdateReviewStatus(levelId: string, $event: any) {
    let newValue = $event.value;
    if (newValue === "undefined") {

      return;
    }
    let mongoQuery = `{"$set":{"reviewStatus":"${newValue}"}}`;
    this.levelService.updateLevel(levelId, mongoQuery).subscribe(res => {
      if (res.ok === 1) {
        console.log(`Changed <ReviewStatus> to ${newValue}, response: `, res);
        this._snackBar.open("Review Status erfolgreich geändert", "", {duration: 1000});
      } else {
        this._snackBar.open("FEHLER - Review Status konnte nicht geändert werden", "", {duration: 2000});
      }
    });
  }

  openDialog(board: any) {
    console.log(board);
    this.dialog.open(BoardPreviewDialogComponent, {
      width: 'calc(40em + 2*24px)',   // Angular Material Dialog has padding 24px by default
      height: 'calc(40em + 2*24px)',
      data: {board: board}
    });
  }
}


