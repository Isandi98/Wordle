let resultElement = document.querySelector('.result')
let mainContainer = document.querySelector('.main-container')
let rowId = 1; 

//Petición al API de palabras

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e109be86d8msha2a09ee98e0655ep1ae285jsna1ad303b5677',
		'X-RapidAPI-Host': 'random-word-api.p.rapidapi.com'
	}
};

fetch('https://random-word-api.p.rapidapi.com/L/5', options)
.then(result => result.json())
.then(data => {
    console.log(data)
    let word = data.word;
    let wordArray = word.toUpperCase().split(''); 
    console.log(wordArray);

    var actualRow = document.querySelector('.row')
    drawSquares(actualRow); 
    listenInput(actualRow)
    addfocus(actualRow) 

    function listenInput(actualRow){
        let squares = actualRow.querySelectorAll('.square'); 
        squares = [...squares];

        let userInput = []

        // Código para manejar Backspace
        squares.forEach(square => {
            square.addEventListener('keydown', e => {
                if(e.key === 'Backspace') {
                    const index = squares.indexOf(e.target);
                    if(index > 0) {
                        squares[index - 1].focus();
                        squares[index - 1].value = '';
                    }
                }
            }); 
        });


        squares.forEach(element =>{
            element.addEventListener('input', event=>{
                // Si no se ha borrado, haga todo lo siguiente:
                if(event.inputType !== 'deleteContentBackward'){
                    //Recoger el ingreso del usuario
                    userInput.push(event.target.value.toUpperCase())
                    
                    if(event.target.nextElementSibling){
                        event.target.nextElementSibling.focus(); 
                    }else{
                        // Crear el arreglo con las letras llenas

                        
                        //Buscar el contenido de la fila anterior

                        //PRUEBAS CON IA 
                        // Obtén todas las celdas de entrada
                

                        



                        //Armar un arreglo con el resultado antes de comparar

                        let squaresFilled = document.querySelectorAll('.square')
                        squaresFilled = [... squaresFilled]
                        let lastFiveSquaresFilled = squaresFilled.slice(-5);
                        let finalUserInput = [];
                        lastFiveSquaresFilled.forEach(Element => {
                            finalUserInput.push(Element.value.toUpperCase())
                        });

                        console.log(finalUserInput); 
                        console.log(userInput);

                        // Cambiar estilos si existe la letra pero no está en la posición correcta
                        let existIndexArray = existLetter(wordArray, userInput)
                        console.log(existIndexArray)
                        existIndexArray.forEach(Element =>{

                            squares[Element].classList.add('gold');
                        }); 
                        //Comparar arreglos para cambiar estilos 
                        let rightIndex = compareArrays(wordArray,userInput)
                        console.log(rightIndex)
                        rightIndex.forEach(Element => {
                            squares[Element].classList.add('green');
                        })
                        // Si los arreglos son iguales 
                        if(rightIndex.length == wordArray.length){
                            showResult('Ganaste!')
                            return; 
                        }
                        //Crear una nueva fila 
                        let actualRow = createRow()

                        if(!actualRow){
                            return
                        }   
                        drawSquares(actualRow)
                        listenInput(actualRow)
                        addfocus(actualRow)
                    }
                }else{
                    userInput.pop();
                }
                console.log(userInput)
            }); 
        })

    }






    //FUNCIONES

    function compareArrays(array1, array2){
        let igualsIndex = []
        array1.forEach((element, index)=>{
            if(element == array2[index]){
                console.log(`En la posicion ${index} si son iguales`);
                igualsIndex.push(index);
            }else{
                console.log(`En la posicion ${index} NO son iguales`);
            }
        });
        return igualsIndex; 
    }

    function existLetter(array1, array2){
        let existIndexArray = [];
        array2.forEach((Element, index)=>{
            if(array1.includes(Element)){
                existIndexArray.push(index)
            }
        });
        return existIndexArray; 
    }
    function createRow(){
        rowId++
        if (rowId <= 5){
            let newRow = document.createElement('div'); 
            newRow.classList.add('row'); 
            newRow.setAttribute('id', rowId)
            mainContainer.appendChild(newRow)
            return newRow; 
        }else{
            showResult(`¡Has perdido! La respuesta correcta era "${word.toUpperCase()}"`)
        }
    }

    function drawSquares(actualRow){
        wordArray.forEach((item, index) => {
            if(index === 0){
                actualRow.innerHTML += '<input type="text" maxLength="1" class="square focus">'
            }else{
                actualRow.innerHTML += '<input type="text" maxLength="1" class="square">'
            }
        });
    }

    function addfocus(actualRow){
        let focusElement = actualRow.querySelector('.focus')
        console.log(focusElement)
        focusElement.focus();
    }
    function showResult(textMsg){
        resultElement.innerHTML = `
        <p>${textMsg}</p>
        <button class="button">Reiniciar</button>`

        let resetBtn = document.querySelector('.button')
        resetBtn.addEventListener('click', ()=>{
            location.reload(); 
        });
    }

    });






