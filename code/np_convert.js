//conversion script by asheshwor
//(c) 2001, 2004, 2016 Asheshwor Man Shrestha email: asheshwor@gmail.com
//please do not modify or remove the comment lines

unitsLength = new Array ("Length Units", "centimeter", "feet", "inch", "kilometer", "meter", "miles", "milimeter", "yards");

fractionLength = new Array ("0", "0.01", "0.3048", "0.0254", "1000", "1", "1609.344", "0.001", "0.9144");

unitsArea = new Array ("Area Units","Acre","Ana","Bigha","Dam","Dhur","Hectare","Kattha","Mato Muri","Paisa","Ropani","sq. feet","sq. inches","sq. meter","sq. miles");

fractionArea = new Array ("0","4046.856","31.79605175","6772.631616","1.98725409","16.93157904","10000","338.6315808","127.184207","7.949012938",
"508.73704704","0.09290304","0.0006452","1","2589988");

function findIndex(text)
	{
	for (i in unitsLength)
		{
		if (text==unitsLength[i])
			{
			indexFound=i;
			break;
			}
		}
	return indexFound;
	}
//*for area
function findIndex2(text)
	{
	for (i in unitsArea)
		{
		if (text==unitsArea[i])
			{
			indexFound=i;
			break;
			}
		}
	return indexFound;
	}
//*********
function fix(number, p)
//*this fixes the decimal places
//*this function copied from solar calculator2.0 by the same author
{
var f=1;
var g=1;
while (f<=p)
	{
	g=g*10;
	f++;
	}
number=number*(g);
number=Math.round(number);
number=number/(g);
return number;
}
function calcA()
	{
	word=document.convertLength.inputUnit.options[document.convertLength.inputUnit.selectedIndex].value;
	n=findIndex(word);
	valA=fractionLength[n];
	return valA;
	}
//for area
function calcA2()
	{
	word=document.convertArea.inputUnit.options[document.convertArea.inputUnit.selectedIndex].value;
	n=findIndex2(word);
	valA=fractionArea[n];
	return valA;
	}
//*******
function calcB()
	{
	word=document.convertLength.outputUnit.options[document.convertLength.outputUnit.selectedIndex].value;
	n=findIndex(word);
	valB=1/fractionLength[n];
	return valB;
	}
//for area
function calcB2()
	{
	word=document.convertArea.outputUnit.options[document.convertArea.outputUnit.selectedIndex].value;
	n=findIndex2(word);
	valB=1/fractionArea[n];
	return valB;
	}
//*********
function breakFeet(number)
	{
	bf=Math.floor(number);
	gf=12*(number-bf);
	gf=fix(gf,4);
	gf1=Math.floor(gf);
	gf2=gf-gf1;
	if (gf2<0.0625)
		{
		gf2="";
		}
		else
			{
			if (gf2<0.1875)
				{
				gf2=" 1/8";
				}
				else
					{
					if (gf2<0.3125)
					{
					gf2=" 1/4";
					}
					else
						{
						if (gf2<0.4375)
						{
						gf2=" 3/8";
						}
						else
							{
							if (gf2<0.5625)
							{
							gf2=" 1/2";
							}
							else
								{
								if (gf2<0.6875)
								{
								gf2=" 5/8";
								}
								else
									{
									if (gf2<0.8125)
									{
									gf2=" 3/4";
									}
									else
										{
										if (gf2<0.9375)
										{
										gf2=" 7/8";
										}
										else
											{
											gf2="";
											gf1=gf1+1;
											}
										}
									}
								}
							}
						}
					}
			}
	bfgf=bf+ "' - " + gf1+"" + gf2 + "''";
	return bfgf;
	}
//*********
function breakInches(number)
	{
	gf=12*(number-Math.floor(number));
	return gf;
	}
//*********
function updateConvert()
	{
	inA=document.convertLength.inBox.value;
	a=calcA()*inA;
	b=calcB();
	valOut=a*b;
	c=fix(fVal(),0);
	valOut=fix(valOut,c);
	document.convertLength.outBox.value=valOut;
	//new addition
		isFeet=document.convertLength.outputUnit.options[document.convertLength.outputUnit.selectedIndex].value;
		if ((isFeet=="feet")|(isFeet=="inch"))
		{
		//enable breaking into feet
		if (isFeet=="feet")
			{
			document.convertLength.breakF.value=breakFeet(valOut);
			}
			else
				{
				document.convertLength.breakF.value=breakFeet(valOut/12);
				}
		}
		else
			{
			document.convertLength.breakF.value=" - ";
			}

	//end of new addition
	//updating solution history
	//updating solution history
		unitIn=document.convertLength.inputUnit.options[document.convertLength.inputUnit.selectedIndex].value
		unitOut=document.convertLength.outputUnit.options[document.convertLength.outputUnit.selectedIndex].value
		if (document.convertLength.breakF.value==" - ")
			{outF=" "
			}
			else
				{
				outF=" ["+document.convertLength.breakF.value+"]"
				}
		bankText=inA+" "+unitIn+" = "+valOut+" "+unitOut+outF
		payload=document.fix.bank.value+"\n"
		payload=payload+bankText
	document.fix.bank.value=payload
	}
//*for area
function updateConvert2()
	{
	var valA,valP,valR;
	inA=document.convertArea.inBox.value;
	a=calcA2()*inA;
	b=calcB2();
	valOut=a*b;
	//alert(fVal());
	c=fix(fVal(),0);
	valOut=fix(valOut,c);
	document.convertArea.outBox.value=valOut;


//for Municipal KTM
	valM1=a*0.0019656529;
	valR=Math.floor(valM1);
	valM1=valM1-valR;
	valM1=valM1*16;
	valA=Math.floor(valM1);
	valM1=valM1-valA;
	valM1=valM1*4;
	valP=Math.floor(valM1);
	valM1=valM1-valP;
	valM1=valM1*4;
	valD=fix(valM1,0);
	//check Dam if 4
	if (valD==4)
		{
		valD=0;
		valP=valP+1;
		}
		else
		{
		valP=valP;
		}
	//check Paisa if 4
	if (valP==4)
		{
		valP=0;
		valA=valA+1;
		}
		else
		{
		valP=valP;
		}
	//check Anna if 16
	if (valA==16)
		{
		valA=0;
		valR=valR+1;
		}
		else
		{
		valA=valA;
		}
	outWord=valR+" - "+valA+" - "+valP+" - "+valD;
	//alert(outWord);
	document.municipal.M1.value=outWord;
//for Municipal Terai
	valM1=a*0.0019656529/13.3126369613;
	valB=Math.floor(valM1);
	valM1=valM1-valB;
	valM1=valM1*20;
	valK=Math.floor(valM1);
	valM1=valM1-valK;
	valM1=valM1*20;
	valDhur=fix(valM1,0);
	//check Dhur if 20
	if (valDhur==20)
		{
		valDhur=0;
		valK=valK+1;
		}
		else
		{
		valDhur=valDhur;
		}
	//check Kattha if 20
	if (valK==20)
		{
		valK=0;
		valB=valB+1;
		}
		else
		{
		valK=valK;
		}
	outWord=valB+" - "+valK+" - "+fix(valDhur,0);
	//alert(outWord);
	document.municipal.M2.value=outWord;
	//updating solution history
		unitIn=document.convertArea.inputUnit.options[document.convertArea.inputUnit.selectedIndex].value
		unitOut=document.convertArea.outputUnit.options[document.convertArea.outputUnit.selectedIndex].value
		muni1=document.municipal.M1.value
		muni2=document.municipal.M2.value
		bankText=inA+" "+unitIn+" = "+valOut+" "+unitOut+" ["+muni1+"] or ["+muni2+"]"
		payload=document.fix.bank.value+"\n"
		payload=payload+bankText
	document.fix.bank.value=payload
	}
//function for swapping length values
function doInvertLength()
	{
	var x=0;
	var y=0;
	document.convertLength.inBox.value=document.convertLength.outBox.value;
	x=document.convertLength.inputUnit.selectedIndex;
	y=document.convertLength.outputUnit.selectedIndex;
	document.convertLength.inputUnit.options[y].selected=true;
	document.convertLength.outputUnit.options[x].selected=true;
	updateConvert();
	}
//function for swapping Area values
	function doInvertArea()
	{
	var x=0;
	var y=0;
	document.convertArea.inBox.value=document.convertArea.outBox.value;
	x=document.convertArea.inputUnit.selectedIndex;
	y=document.convertArea.outputUnit.selectedIndex;
	document.convertArea.inputUnit.options[y].selected=true;
	document.convertArea.outputUnit.options[x].selected=true;
	updateConvert2();
	}
//* reverse calculations for municipal formats
//	updated march 2005
	function doUpdateAreaM1()
	{
	var m1a=document.municipalRev.M1a.value
	var m1b=document.municipalRev.M1b.value
	var m1c=document.municipalRev.M1c.value
	var m1d=document.municipalRev.M1d.value
	var sqftval=m1a*256+m1b*16+m1c*4+m1d*1
	document.convertArea.inBox.value=fix(sqftval,0);
	document.convertArea.inputUnit.options[3].selected=true;
	//update solution history
		bankText=m1a+" Ropani-"+m1b+"Ana-"+m1c+" Paisa-"+m1d+"Dam ="
		payload=document.fix.bank.value+"\n"
		payload=payload+bankText
		document.fix.bank.value=payload
	//end of updating solution

	updateConvert2();
	}
	function doUpdateAreaM2()
		{
		var m1a=document.municipalRev.M2a.value
		var m1b=document.municipalRev.M2b.value
		var m1c=document.municipalRev.M2c.value
		var sqftval=m1a*400+m1b*20+m1c*1
		document.convertArea.inBox.value=fix(sqftval,0);
		document.convertArea.inputUnit.options[4].selected=true;
		//update solution history
				bankText=m1a+" Bigha-"+m1b+" Kattha-"+m1c+" Dhur ="
				payload=document.fix.bank.value+"\n"
				payload=payload+bankText
				document.fix.bank.value=payload
	//end of updating solution

	updateConvert2();
	}
//clearing solution history box
function clearBank()
	{
	document.fix.bank.value=" : : : Calculation Log : : :"
	}
//* get fix value
function fVal()
	{
	f=eval(document.fix.fixValue.options[document.fix.fixValue.selectedIndex].value);
	return f;
	}

function loadPage() {
	onload=updateConvert();
	updateConvert2();
	clearBank();
}

window.onload = loadPage()
//breaking to Municipality format (for Nepal)
//
//  Ropani(R) - Ana(A) - Paisa(P) - Dam(D)   FORMAT used in Kathmandu Valley
//  Bigha - Kattha - Dhur   FORMAT used in Terai Region

//end of the script
//email: <asheshwor@gmail.com>
