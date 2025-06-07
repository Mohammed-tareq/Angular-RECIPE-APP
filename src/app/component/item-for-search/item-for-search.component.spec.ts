import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemForSearchComponent } from './item-for-search.component';

describe('ItemForSearchComponent', () => {
  let component: ItemForSearchComponent;
  let fixture: ComponentFixture<ItemForSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemForSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemForSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
