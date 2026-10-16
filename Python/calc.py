print("Calculator")
num1=input("Enter your 1st number:")
num2=input("Enter your 2nd number:")
opp=input("Whats the required operation(eg +,-,*,/,%,**):")
if opp=="+": 
    print("Answer:",float(num1)+float(num2))

elif opp=="-" :
    print("Answer:",float(num1)-float(num2))

elif opp=="*": 
    print("Answer:",float(num1)*float(num2))

elif opp=="/":
    print("Answer:", float(num1)/float(num2))

elif opp=="%": 
    print("Answer:",float(num1)%float(num2))

elif opp=="**": 
    print("Answer:",int(num1)**int(num2))
else :
    print("Error")

