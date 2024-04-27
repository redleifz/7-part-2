import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentService],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('countGender', () => {
    it('should return correct count of males', () => {
      const users = [
        { name: 'John', gender: 'male' },
        { name: 'Jane', gender: 'female' },
        { name: 'Mike', gender: 'male' },
        { name: 'Emily', gender: 'female' },
        { name: 'Jessy', gender: 'female' }
      ];
  
      const resultMale = service.countGender(users, 'male');
      const resultFemale = service.countGender(users, 'female')
  
      expect(resultMale).toEqual(2);
      expect(resultFemale).toEqual(3);
    });
  });

  //getAgeRange
  describe('getAgeRange', () => {
    it('should return correct age range', () => {
      const users = [
        { name: 'John', age: 20 },
        { name: 'Jane', age: 25 },
        { name: 'Mike', age: 30 },
        { name: 'Emily', age: 35 },
        { name: 'Jessy', age: 40 }
      ];
  
      const result = service.getAgeRange(users);
  
      expect(result).toEqual('20-40');
    });
  });
  
  //getHairColor
  describe('getHairColor', () => {
    it('should return correct count of hair color', () => {
      const users = [
        { name: 'John', hair: { color: 'Black' } },
        { name: 'Jane', hair: { color: 'Blond' } },
        { name: 'Mike', hair: { color: 'Black' } },
        { name: 'Emily', hair: { color: 'Brown' } },
        { name: 'Jessy', hair: { color: 'Black' } }
      ];
  
      const resultBlack = service.getHairColor(users, 'Black');
      const resultBlond = service.getHairColor(users, 'Blond');
      const resultBrown = service.getHairColor(users, 'Brown');
  
      expect(resultBlack).toEqual(3);
      expect(resultBlond).toEqual(1);
      expect(resultBrown).toEqual(1);
    });
  });

  //getFullNameWithpostalCode
  describe('getFullNameWithpostalCode', () => {
    it('should return correct full name with postal code', () => {
      const users = [
        { firstName: 'John', lastName: 'Doe', address: { postalCode: '12345' } },
        { firstName: 'Jane', lastName: 'Doe', address: { postalCode: '54321' } },
        { firstName: 'Mike', lastName: 'Doe', address: { postalCode: '67890' } },
        { firstName: 'Emily', lastName: 'Doe', address: { postalCode: '09876' } },
        { firstName: 'Jessy', lastName: 'Doe', address: { postalCode: '45678' } }
      ];
  
      const result = service.getFullNameWithpostalCode(users);
  
      expect(result).toEqual({
        'JohnDoe': '12345',
        'JaneDoe': '54321',
        'MikeDoe': '67890',
        'EmilyDoe': '09876',
        'JessyDoe': '45678'
      });
    });
  });


});

