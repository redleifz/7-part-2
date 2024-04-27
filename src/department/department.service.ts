import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DepartmentService {
  fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      // console.log(response.data.users)
      return response.data.users; // Access the 'data' property of the response object
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  async groupByDepartment() {
    const rawData = await this.fetchData();

    const data = {
      department: {
        male: this.countGender(rawData, 'male'),
        female: this.countGender(rawData, 'female'),
        ageRange: this.getAgeRange(rawData),
        hair: {
          Black: this.getHairColor(rawData, 'Black'),
          Blond: this.getHairColor(rawData, 'Blond'),
          Chestnut: this.getHairColor(rawData, 'Chestnut'),
          Brown: this.getHairColor(rawData, 'Brown'),
        },
        addressUser: this.getFullNameWithpostalCode(rawData),
      },
    };
    return data;
  }

  countGender = (users: { gender: string }[], gender: string): number => {
    return users.filter((user) => user.gender === gender).length;
  };

  getAgeRange = (users: { age: number }[]): string => {
    const age = users.map((user) => user.age);
    const min = Math.min(...age);
    const max = Math.max(...age);
    return `${min}-${max}`;
  };

  getHairColor = (
    users: {
      hair: {
        color: string;
      };
    }[],
    hairColor: string,
  ): number => {
    return users.filter((user) => user.hair.color === hairColor).length;
  };
  
  getFullNameWithpostalCode = (
    users: {
      firstName: string;
      lastName: string;
      address: { postalCode: string };
    }[],
  ) => {
    const fullNameWithPostalCode: { [fullName: string]: string } = {};

    users.map((user) => {
      const fullName = `${user.firstName}${user.lastName}`;
      fullNameWithPostalCode[fullName] = user.address.postalCode;
    });

    return fullNameWithPostalCode;
  };
}
