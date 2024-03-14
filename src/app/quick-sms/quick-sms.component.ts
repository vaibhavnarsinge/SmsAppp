import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-quick-sms',
  templateUrl: './quick-sms.component.html',
  styleUrls: ['./quick-sms.component.css'],
})
export class QuickSmsComponent {
  isChecked: boolean = false;
  showFirstt: boolean = true;
  showSecondd: boolean = false;
  validCount: number = 0;
  InvalidCount: number = 0;
  rData: any;
  rDataKey: any;
  textC:  number = 0;
  msgLength: any;
  TotalCreditChages:  number = 0;
  phoneNumber: any;
  characterCount: number = 0;
  imgvalue:any;
  imgsrc:any;
 
  showFirst = true;
  showSecond = false;
  currentDate: Date = new Date();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  quicksms!: FormGroup;
  sideform!:FormGroup;
  ngOnInit(): void {
    this.quicksms = this.formbuilder.group({
      username: ['demotr'],
      password: ['tr@1234'],
      sender: [''],
      templateid: [''],
      mob: [''],
      msg: [''],
      coding: ['1'],
      testmob:['']
    });

    this.sideform = this.formbuilder.group({
      displayArray:[''],
      chatbot:[''],
      img:[''],
      vdo:['']
    });

    this.quicksms.get('mob')?.valueChanges.subscribe(value => {
      this.updateCounts(value);
    });
  }

  constructor( private msgService: MsgServiceService,private formbuilder: FormBuilder) {}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  showFirstdiv() 
  {
    this.showFirst = true;
    this.showSecond = false;
  }

  showSeconddiv() 
  {
    this.showFirst = false;
    this.showSecond = true;
  }

  doSomething() 
  {
    if (this.isChecked == false) 
    {
      this.isChecked = true;
    } else if (this.isChecked == true) 
    {
      this.isChecked = false;
    }
  }

  // selectedOption: any;
  selectedOptionText: any;

  //assigning template text to template Id
  updateText() 
  {debugger
    switch (this.quicksms.controls['templateid'].value) 
    {
      case '1707161891201501738':
        this.quicksms.get('msg')!.setValue(`Your My SMS verification Code id ${this.imgsrc}. Do not share this code with others Team Nuevas`);
       
        break;
      case '1707161855199873979':
        this.selectedOptionText =
        this.quicksms.get('msg')!.setValue(`Dear User your OTP is ${this.imgsrc} Kindly use OTP to validate your Registration. Team Trackzia`);
        break;
      case '1707161899992775140':
        this.selectedOptionText =
        this.quicksms.get('msg')!.setValue(`Dear {#var#} , Your Complaint with Complaint Id: ${this.imgsrc} has Been Resolve Kindly Share OTP, The OTP is {#var#} \n From Nuevas`);
        break;
    }
    const textAreaCount = this.quicksms.get('msg')!.value;

    const textareaLength = textAreaCount.length;
    this.characterCount = textareaLength
    this.textC = 1;
    this.calculateCharacterCount();

  }

    // setting images link
    getSelectedImage(event:any){
      this.imgvalue = event.target.value
      this.imgsrc = `http://localhost:4200/assets/${this.imgvalue}`
    }

  //clear text of Mobile Number Textarea, and count of valid and invalid count
  clearTextarea() 
  {
    this.quicksms.get('mob')?.setValue('');
    this.InvalidCount = 0;
    this.validCount = 0;

    this.isPooselect=false;
    this.isTextselect=false;
    this.isAllselect=false;
  }




  //calculating count of characters of message
  calculateCharacterCount() 
  {
    this.quicksms.get('msg')!.valueChanges.subscribe(value => {
      this.characterCount = value.length;
      // this.characterCount = value.length;

    //this logic is used for if first msg is 160 chracter then textC = 1,
    //after that after every 140 characters textC should increase by 1
    if (this.characterCount == 0) {
      this.textC = 0;
    } else if (this.characterCount < 160) {
      this.textC = 1;
    }
     else if (this.characterCount > 160 ) {
      const additionalBlocks = Math.floor((this.characterCount -1) / 160);
      this.textC = 1+additionalBlocks;
    } 
    this.TotalCreditChages = this.validCount * this.textC;
    }) 
  }


  isPooselect:boolean=false;
  isTextselect:boolean=false;
  isAllselect:boolean=false;

  poolNumbers:any = '9730023006\n7028704745';
  textNumbers:any = '8805411737';


  UpdateTextAreaFirst(e: any) {
    if (e.target.checked == true) {
      this.quicksms.patchValue({
        mob: [this.poolNumbers+'\n'+this.textNumbers],
      });

      this.isPooselect = true
      this.isTextselect = true

    } else if (e.target.checked == false) {
      this.quicksms.patchValue({
        mob: '',
      });
      this.isPooselect = false
      this.isTextselect = false
    }


    this.updateCounts(this.quicksms.get('mob')?.value);

  }

  UpdateTextAreaSnd(e: any) 
  {debugger
    if (e.target.checked == true) {
      this.isPooselect = true
      this.quicksms.patchValue({
        mob: [this.poolNumbers+'\n'+this.quicksms.get('mob')?.value],
      });
    } else if (e.target.checked == false) {
      this.isPooselect = false
      this.isAllselect = false
      var allNUM = this.quicksms.get('mob')?.value
      var reNUm = allNUM.replace(allNUM, this.textNumbers)
      this.quicksms.patchValue({
        mob: reNUm,
      });
    }


    this.updateCounts(this.quicksms.get('mob')?.value);

  }

  UpdateTextAreaTrd(e: any) {
    debugger
    if (e.target.checked == true) {
      this.isTextselect = true
      this.quicksms.patchValue({
        mob: [this.textNumbers+'\n'+this.quicksms.get('mob')?.value],
      });
    } else if (e.target.checked == false) {
      this.isTextselect = false
      this.isAllselect = false
      var allNUM = this.quicksms.get('mob')?.value
      var reNUm = allNUM.replace(allNUM, this.poolNumbers)
      this.quicksms.patchValue({
        mob: reNUm,
      });
    }


    this.updateCounts(this.quicksms.get('mob')?.value);

  }

  updateCounts(value: string): void {
    const phoneNumberArray = value.split('\n').map((number: string) => number.trim());

    this.validCount = 0;
    this.InvalidCount = 0;

    phoneNumberArray.forEach((number: string) => {
      if (number.length === 10 && /^\d+$/.test(number)) {
        this.validCount++;
      } else if (number.trim().length > 0) 
      { 
        this.InvalidCount++;
      }
    });

    this.TotalCreditChages = this.validCount * this.textC;
  }

  

  SendMsg() {
    

    let myArray:any[] = [];

    //assigning phone numbers (,) separated to mobile number formbuilder value
    let AllMobileNumbers: string = this.quicksms.get('mob')!.value;
    const phoneNumberArray = AllMobileNumbers.split('\n').map(number => number.trim()).filter(number => number !== '');
    const uniquePhoneNumbers = Array.from(new Set(phoneNumberArray));
    const validPhoneNumbers = uniquePhoneNumbers.filter(number => number.length === 10 && /^\d+$/.test(number));
    const formattedPhoneNumbers = validPhoneNumbers.join(',');
    this.quicksms.get('mob')!.setValue(formattedPhoneNumbers);


    return this.msgService.SendMsg(this.quicksms.value).subscribe((res: any) => {
        if (res.Success == true) 
        {debugger
          alert(res.Message);

          // localStorage.setItem('EMpData',JSON.stringify(myArray));

          this.msgService.setDataInJson(res).subscribe({
            next:(res:any)=>{
              alert("Data Saved in JSON SERVER "+ res.Message)
              console.log(res);
              
            }
          })

          // this.msgService.Username = this.quicksms.value.username;
          // localStorage.setItem('Username', this.msgService.Username);
        }
        else{
          alert(res.Message);
        }
        console.log(res);


      });
  }


  // npm install xlsx

      // Call onFileSelected with the  event 

  // importContacts(){
  //   const dummyEvent = {
  //     target: {
  //       files: [new File([], 'dummyFile')]
  //     }
  //   };
  //   this.onFileSelected(dummyEvent);

  // }
  allExcelNumbers:any;
    
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const contacts: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract mobile numbers from contacts (assuming they are in a specific column)
      const mobileNumbers: string[] = contacts.map(row => row[0]); // Change 0 to the column index where mobile numbers are located

      // Join mobile numbers with newline characters
      const mobileNumbersString: string = mobileNumbers.join('\n');

      // Set the mobile numbers string to the 'mob' control
      this.allExcelNumbers = mobileNumbersString

    };

    reader.readAsBinaryString(file);
  }



  importContacts(): void {
    // Update the 'mob' control with the mobileNumbersString
    this.quicksms.patchValue({ mob: this.allExcelNumbers });
  }
}
