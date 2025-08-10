import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsListComponent } from '../../src/app/contacts/components/contacts-list/contacts-list.component';

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of contacts', () => {
    expect(component.contacts.length).toBe(6);
  });

  it('should display contact count in header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('6 contacts');
  });

  it('should generate correct initials', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Jane Smith')).toBe('JS');
    expect(component.getInitials('Michael Johnson')).toBe('MJ');
  });

  it('should display contact names and emails', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('john.doe@example.com');
  });
});
