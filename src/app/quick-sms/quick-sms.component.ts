import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
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

 
  showFirst = true;
  showSecond = false;
  currentDate: Date = new Date();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  quicksms!: FormGroup;
  sideform!:FormGroup;
  submitted: boolean = false;
  ngOnInit(): void {
    
    this.quicksms = this.formbuilder.group({
      username: ['demotr', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['tr@1234', [Validators.required,Validators.minLength(5)]],
      sender: ['', [Validators.required]],
      templateid: ['', [Validators.required]],
      mob: ['', [Validators.required]],
      msg: ['', [Validators.required]],
      coding: ['', [Validators.required]],
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

  constructor( private msgService: MsgServiceService,
    private formbuilder: FormBuilder) 
    {

  }
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
  {
    switch (this.quicksms.controls['templateid'].value) 
    {
      case '1707161891201501738':
        this.quicksms.get('msg')!.setValue(`Your My SMS verification Code id ${this.replaceVar()}. Do not share this code with others Team Nuevas`);
       
        break;
      case '1707161855199873979':
        this.selectedOptionText =
        this.quicksms.get('msg')!.setValue(`Dear User your OTP is ${this.replaceVar()} Kindly use OTP to validate your Registration. Team Trackzia`);
        break;
      case '1707161899992775140':
        this.selectedOptionText =
        this.quicksms.get('msg')!.setValue(`Dear {#var#} , Your Complaint with Complaint Id: ${this.replaceVar()} has Been Resolve Kindly Share OTP, The OTP is {#var#} \n From Nuevas`);
        break;
    }
    const textAreaCount = this.quicksms.get('msg')!.value;

    const textareaLength = textAreaCount.length;
    this.characterCount = textareaLength
    this.textC = 1;
    this.calculateCharacterCount();
  }
  replaceVar() {
    if (this.imgsrc) {
        return this.imgsrc;
    } 
    else if (this.videosrc) {
        return this.videosrc;
    } 
    else {
        return '{var}';
    }
}
imgselectvalue:any;
vdoselectvalue:any
imgpath:any
imgsrc:any;
videopath:any
videosrc:any
videoAvailable:boolean=false;
imageAvailable:boolean=false;

    // setting images link
    getSelectedImage(event:any){
      
      if(event.target.value == ""){
        this.imageAvailable = false
      }
      else{
        this.imageAvailable = true
      }
      this.imgselectvalue = event.target.value
      this.imgpath = `http://localhost:4200/assets/${this.imgselectvalue}`
      this.imgsrc = `http://Google.com/${this.imgselectvalue}`
    }
    getSelectedVideo(event:any){
      if(event.target.value == ""){
        this.videoAvailable = false
      }
      else{
        this.videoAvailable = true
      }

      this.vdoselectvalue = event.target.value

      this.videopath = `http://localhost:4200/assets/${this.vdoselectvalue}`
      this.videosrc = `http://Google.com/${this.vdoselectvalue}`

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


  hideMedia = true
  hideChatbot = true
  hideGroup = true
  hideDiv3(){
    if(this.hideMedia == true){
      this.hideMedia = false;
    }
    else if(this.hideMedia == false){
      this.hideMedia = true;
    }
  }
  hideDiv2(){
    if(this.hideChatbot == true){
      this.hideChatbot = false;
    }
    else if(this.hideChatbot == false){
      this.hideChatbot = true;
    }
  }
  hideDiv1(){
    if(this.hideGroup == true){
      this.hideGroup = false;
    }
    else if(this.hideGroup == false){
      this.hideGroup = true;
    }
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
      this.isAllselect = true
      let selectedNumber = this.poolNumbers + '\n' + this.textNumbers;

      this.quicksms.patchValue({
        mob: selectedNumber
      });
      this.updateCounts(selectedNumber)

      this.isPooselect = true
      this.isTextselect = true

    } else {
      this.isAllselect = false
      this.quicksms.patchValue({
        mob: '',
      });
      this.isPooselect = false
      this.isTextselect = false
      this.InvalidCount = 0;
      this.validCount = 0;
    }
  }

  UpdateTextAreaSnd(e: any) 
  {
    if (e.target.checked == true) {
      this.isPooselect = true
      let currentNumber = this.quicksms.get('mob')?.value;
      if(!currentNumber.includes(this.poolNumbers)){
        currentNumber ? currentNumber += '\n'+this.poolNumbers : currentNumber += this.poolNumbers;
        this.quicksms.patchValue({
          mob: currentNumber
        });
        this.updateCounts(currentNumber);
      }
     
    } else {
      this.isPooselect = false
      this.isAllselect = false

      const regex = new RegExp('(\\n)?' + this.poolNumbers+ '(\\n)?', 'g');
      let replaceNum = this.quicksms.controls['mob'].value.replace(regex,'')
     
      this.quicksms.patchValue({
        mob: replaceNum,
      });
    }
  }

  UpdateTextAreaTrd(e: any) {
    
    if (e.target.checked ) {
      this.isTextselect = true
      let currentNumber = this.quicksms.get('mob')?.value || '';
      if(!currentNumber.includes(this.textNumbers)){
        currentNumber ? currentNumber += '\n'+this.textNumbers : currentNumber += this.textNumbers;
        this.quicksms.patchValue({
          mob: currentNumber
        });
        this.updateCounts(currentNumber);

      }
      
    } else if (e.target.checked == false) {
      this.isTextselect = false
      this.isAllselect = false
      const regex = new RegExp('(\\n)?' + this.textNumbers+ '(\\n)?', 'g');
      let replaceNum = this.quicksms.controls['mob'].value.replace(regex,'')
      this.quicksms.patchValue({
        mob: replaceNum,
      });
    }
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
    
    this.submitted = true;
    let myArray:any[] = [];
    let messagee = this.quicksms.get("msg")?.value
    let credit = this.TotalCreditChages
    let date = this.currentDate
    let senderID = this.quicksms.get("sender")?.value
 
    //assigning phone numbers (,) separated to mobile number formbuilder value
    let AllMobileNumbers: string = this.quicksms.get('mob')!.value;
    const phoneNumberArray = AllMobileNumbers.split('\n').map(number => number.trim()).filter(number => number !== '');
    const uniquePhoneNumbers = Array.from(new Set(phoneNumberArray));
    const validPhoneNumbers = uniquePhoneNumbers.filter(number => number.length === 10 && /^\d+$/.test(number));
    const formattedPhoneNumbers = validPhoneNumbers.join(',');
    this.quicksms.get('mob')!.setValue(formattedPhoneNumbers);

    return this.msgService.SendMsg(this.quicksms.value).subscribe((res: any) => {
        if (res.Success == true) 
        {
          alert(res.Message);
        }
        else{
          alert(res.Message);
        }

        res["messagee"] =messagee;
        res["credit"]= credit;
        res["date"]= date;
        res['senderID'] = senderID
        
        this.msgService.setDataInJson(res).subscribe({
          next:(res:any)=>{
            alert("Data Saved in JSON SERVER "+ res.Message)
            console.log(res);
            
          }
        })
        console.log(res);
      });
  }

  allExcelNumbers:any;
    
  onFileSelected(event: any): void {
    debugger
    
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      debugger
      const binaryString: string = e.target.result; // storing binary data in string
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' }); // reading data in excel 
      const sheetName: string = workbook.SheetNames[0]; // first sheet of workbook stored in sheetname
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName]; // storing sheet present in sheetname
      const contacts: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); //this line convert data into json or js object
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
