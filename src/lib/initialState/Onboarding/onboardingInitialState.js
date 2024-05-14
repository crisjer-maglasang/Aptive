import { onboardingDataValues } from '@/lib/constants';
import { toISOSubString, formatDate } from '../..';

const generateOnboardingState = (data) => {
  const string = (field) => (data?.[field] ? data[field] : '');
  const date = (field) =>
    data?.[field] === null ? toISOSubString(data[field]) : '';

  const formattedDate = field => formatDate(field);

  const placeholderArr = ['', ''];
  const height = data?.['height'] ? data['height'].split(' ') : placeholderArr;

  const parseHistory = (data) => {
    return data?.map((item) => ({
      setId: `${item.id}`,
      id: item.id,
      'addressHistoryName': { value: item['address'], errors: [] },
      'addressHistoryStartDate': { value: item['resident_from'], errors: [] },
      'addressHistoryEndDate': { value: item['resident_to'], errors: [] },
    }));
  };
  const parseReferences = (data) => {
    return data?.map((item) => ({
      setId: `${item.id}`,
      id: item.id,
      'referenceName': { value: item['name'], errors: [] },
      'referenceRelation': { value: item['relation'], errors: [] },
      'referencePhoneNumber': { value: item['phone'], errors: [] },
    }));
  };

  const parseRepExperience = (data) => {
    return data?.map((item) => ({
      setId: `${item.id}`,
      id: item.id,
      'companyName': { value: item['name'], errors: [] },
      'numberofAccounts': { value: item['accounts'], errors: [] },
    }));
  };

  const parseEmployer = (data) => {
    return data?.map((item) => ({
      setId: `${item.id}`,
      id: item.id,
      'employerName': { value: item['employer'], errors: [] },
      'employerStartDate': { value: item['service_from'], errors: [] },
      'employerEndDate': { value: item['service_to'], errors: [] },
    }));
  };

  const references = data?.['references']
    ? parseReferences(data['references'])
    : [];
  const employmentHistory = data?.['employment']
    ? parseEmployer(data['employment'])
    : [];
  const residentialHistory = data?.['residential']
    ? parseHistory(data['residential'])
    : [];
  const repExperience = data?.['experience']
    ? parseRepExperience(data['experience'])
    : [];

  return {
    personalData: {
      identifierData: {
        firstName: { value: string('first_name'), errors: [] },
        lastName: { value: string('last_name'), errors: [] },
        fullName: { value: string('full_name'), errors: [] },
        dob: { value: formattedDate(data?.['dob']) || '', errors: [] },
        gender: { value: string('gender'), errors: [] },
        mobile: { value: string('mobile'), errors: [] },
        profilePicture: { value: '', errors: [] },
      },
      marriageData: {
        isMarried: {
          value: data?.['marital_status'] ? data['marital_status'] : 'married',
          errors: [],
        },
        spouseFirstName: { value: string('spouse_name'), errors: [] },
        spouseLastName: { value: string('spouse_last_name'), errors: [] },
      },
      emergencyData: {
        emergencyContactName: {
          value: string('emergency_contact_name'),
          errors: [],
        },
        emergencyContactPhoneNumber: {
          value: string('emergency_contact_phone_number'),
          errors: [],
        },
      },
      addressData: {
        addressOne: { value: string('address1'), errors: [] },
        addressCity: { value: string('permanent_city'), errors: [] },
        addressState: { value: string('permanent_zip'), errors: [] },
        addressZip: { value: string('permanent_zip'), errors: [] },
      },
      currentAddressData: {
        currentAddressExists:
          typeof data?.['currentAddressOne'] !== 'undefined' ||
          typeof data?.['currentAddressCity'] !== 'undefined' ||
          typeof data?.['currentAddressState'] !== 'undefined' ||
          typeof data?.['currentAddressZip'] !== 'undefined'
            ? true
            : false,
        currentAddressOne: { value: string('current_address1'), errors: [] },
        currentAddressCity: { value: string('current_city'), errors: [] },
        currentAddressState: { value: string('current_state'), errors: [] },
        currentAddressZip: { value: string('current_zip'), errors: [] },
      },
      identificationData: {
        ssnNumber: { value: string('ss'), errors: [] },
        driverLicenseNumber: {
          value: string('drivers_license_number'),
          errors: [],
        },
        driverLicenseStateIssued: {
          value: string('state_issued'),
          errors: [],
        },
        driverLicenseExpirationDate: {
          value: data?.['drivers_license_expiration_date'] || '',
          errors: [],
        },
        passportExpirationDate: {
          value: data?.['passport_expiration_date'] || '',
          errors: [],
        },
      },
    },
    housingAndVehicleData: {
      arrivalData: {
        expectedArrivalDate: {
          value: formattedDate(data?.['arrival_date']) || '',
          errors: [],
        },
        tentativeKnockingStartDate: {
          value: formattedDate(data?.['start_date']) || '',
          errors: []
        },
        tentativeKnockingEndDate: {
          value: formattedDate(data?.['end_date']) || '',
          errors: []
        },
      },
      housingData: {
        needsHousing: {
          value: data?.['rent_situation'] ? data['rent_situation'] : '1',
          errors: [],
        },
        housingType: {
          value: String(data?.['apartment_status_id'] ?? ''),
          errors: [],
        },
        numOfRooms: {
          value: data?.['no_of_rooms']
            ? data['no_of_rooms']
            : 1,
          errors: [],
        },
        repAcknowledgment: {
          value: data?.['rep_acknowledgment'] ? data['rep_acknowledgment'] : false,
          errors: [],
      },
        roommateRequest: { value: string('roommate_request'), errors: [] },
      },


      residentialHistoryData: residentialHistory,
      vehicleData: {
        hasSegway: {
          value: data?.['has_segway'] ? data['has_segway'] : '0',
          errors: [],
        },
        hasVehicle: {
          value: data?.['has_car'] ? data['has_car'] : '0',
          errors: [],
        },
        vehicleMake: { value: '', errors: [] }, // needs update
        vehicleModel: { value: string('vehicle_model'), errors: [] },
        vehicleColor: { value: '', errors: [] }, // needs update
        vehicleYear: { value: string('purchase_year'), errors: [] },
        vehiclePlateNumber: {
          value: string('license_plate_number'),
          errors: [],
        },
        vehicleRegistrationState: {
          value: string('license_state'),
          errors: [],
        },
      },
    },
    uniformAndSwagData: {
      uniformData: {
        shirtSize: { value: string('polo_shirt_size'), errors: [] },
        jacketSize: { value: string('jacket_size'), errors: [] },
        waistSize: { value: string('waist_size'), errors: [] },
        hatSize: { value: string('hat_size'), errors: [] },
        shoeSize: { value: string('shoe_size'), errors: [] },
      },
    },
    licensingData: {
      licensingPersonalData: {
        race: { value: string('ethnicity'), errors: [] },
        height: {
          feet: { value: height[0], errors: [] },
          inches: { value: height[1], errors: [] },
        },
        weight: { value: string('weight'), errors: [] },
        hairColor: { value: string('hair_color'), errors: [] },
        eyeColor: { value: string('eye_color'), errors: [] },
        cityOfBirth: { value: string('city'), errors: [] },
        stateOfBirth: { value: string('birth_state'), errors: [] },
        isUsCitizen: {
          value: data?.['is_us_citizen'] ? data['is_us_citizen'] : 'yes',
          errors: [],
        },
        hasVisibleMarkings: {
          value: data?.['has_visible_markings']
            ? data['has_visible_markings']
            : 'yes',
          errors: [],
        },
        isConvictedOfCrime: {
          value: data?.['is_crime'] ? data['is_crime'] : 'YES',
          errors: [],
        },
        hasRepExperience: {
          value: data?.['previous_sales_company'] ? data['previous_sales_company'] : '1',
          errors: [],
        },

      },

    },
  //   come back to fix this
  // employmentData: employmentHistory,
  // referenceData: references,
  //   },


    hrData: {
      usesType: { value: 'passport' },
      passportData: {
        passportPicture: { value: '', errors: [] },
      },
      driverLicenseAndSocialSecurityCardData: {
        driverLicense: { value: '', errors: [] },
        socialSecurityCard: { value: '', errors: [] },
      },
      signatureData: {
        signature: { value: '', errors: [] },
      },
    },
  };
};

export default generateOnboardingState;
