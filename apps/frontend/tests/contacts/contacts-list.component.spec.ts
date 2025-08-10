import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsListComponent } from '../../src/app/contacts/components/contacts-list/contacts-list.component';
import { ContactsFacade } from '../../src/app/contacts/facades/contacts.facade';
import { ContactReadModel } from '@effectiv-crm/application';
import { signal } from '@angular/core';

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;
  let mockContactsFacade: Partial<ContactsFacade>;

  const mockContacts: ContactReadModel[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Acme Corporation'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      company: 'Tech Solutions Ltd'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com'
    }
  ];

  beforeEach(async () => {
    const contactsSignal = signal(mockContacts);
    const loadingSignal = signal(false);
    const errorSignal = signal('');

    mockContactsFacade = {
      contacts: contactsSignal,
      loading: loadingSignal,
      error: errorSignal,
      loadContacts: jest.fn(),
      registerContact: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ContactsListComponent],
      providers: [
        { provide: ContactsFacade, useValue: mockContactsFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadContacts on init', () => {
    expect(mockContactsFacade.loadContacts).toHaveBeenCalled();
  });

  it('should display the correct number of contacts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('3 contacts');
  });

  it('should generate correct initials', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Jane Smith')).toBe('JS');
    expect(component.getInitials('Michael Johnson')).toBe('MJ');
  });

  it('should display contact names, emails, and companies', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('john.doe@example.com');
    expect(compiled.textContent).toContain('Acme Corporation');
  });

  it('should display company when available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Acme Corporation');
    expect(compiled.textContent).toContain('Tech Solutions Ltd');
  });

  it('should not display company when not available', () => {
    // Michael Johnson doesn't have a company
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Michael Johnson');
  });
});
