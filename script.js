// Some starter code
let legoToSave = {}
let legoDisplay = document.getElementById("displayOfLego")
let index = 0

//get correct indexing 
fetch(`http://localhost:3000/legoCreations`)
    .then(response => response.json())
    .then(legoInfo => {
        console.log(legoInfo.length)
        index = legoInfo.length
        console.log(index)
    })


//get color options
fetch(`http://localhost:3000/color`)
    .then(response => response.json())
    .then(legoInfo => {
        console.table(legoInfo)
        console.log(index)
        legoInfo.forEach(element => {
            console.log(element.name)
            let color = element.name
            let selections = document.getElementById("lego__color")

            let id = element.id
            let html = `
     <option value="${id}">${color}</option>
     `
            selections.innerHTML += html

        });
    })

//save lego
document.querySelector(".lego__save").addEventListener("click", event => {

    const creatorValue = document.querySelector("#lego__creator").value
    const colorValue = document.querySelector("#lego__color").value
    const shapeValue = document.querySelector("#lego__shape").value
    const creationValue = document.querySelector("#lego__creation").value
    index += 1

    // Once you have collected all the values, build your data structure
    legoToSave = {
        id: index,
        creator: creatorValue,
        colorId: parseInt(colorValue),
        shape: shapeValue,
        creation: creationValue
    }
    console.log(legoToSave)
    fetch(`http://localhost:3000/legoCreations/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(legoToSave)
    })


})

//see your lego after its created

document.querySelector(".lego__see").addEventListener("click", event => {
    legoDisplay.innerHTML = ""
    fetch(`http://localhost:3000/legoCreations`)
        .then(response => response.json())
        .then(legoInfo => {
            //loop over legoInfo
            //do a fetch to colors resource, pass in ID providided form colorID
            console.log(legoInfo)
            legoInfo.forEach(element => {


                let creator = element.creator
                let shape = element.shape
                let creation = element.creation
                let colorId = element.colorId
                let color;

                fetch(`http://localhost:3000/color?id=${colorId}`)
                    .then(response => response.json())
                    .then(colorInfo => {
                        console.log(colorInfo[0])
                        color = colorInfo[0].name
                        console.log(color)
                        let html = `
                                <p>Here is ${creator}'s lego</p>
                                <p>${shape}</p>
                                <p>${creation}</p>
                                <p>${color}</p>
                                `
                        legoDisplay.innerHTML += html

                    })
                console.log(color)


            })




        });

})
