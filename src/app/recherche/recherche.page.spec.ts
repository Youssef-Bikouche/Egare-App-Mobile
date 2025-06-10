import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RecherchePage } from './recherche.page';

describe('RecherchePage', () => {
  let component: RecherchePage;
  let fixture: ComponentFixture<RecherchePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecherchePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RecherchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
