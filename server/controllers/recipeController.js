const mongoose = require('mongoose')
require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

// GET 
// HOMEPAGE

exports.homepage = async (req, res) => {
    try {
        const limitnumber = 5;
        const categories = await Category.find({}).limit(limitnumber);
        const latest = await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
        const thai = await Recipe.find({'category':'Thai'}).limit(limitnumber);
        const american = await Recipe.find({'category':'American'}).limit(limitnumber);
        const chinese = await Recipe.find({'category':'Chinese'}).limit(limitnumber);
        const indian = await Recipe.find({'category':'Indian'}).limit(limitnumber);

        const food= {latest,thai,american,chinese,indian};
        // const food={latest};
        res.render('index', { title: 'Cooking Blog- Home', categories,food });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
}
// GET Categories

exports.exploreCategories = async (req, res) => {
    try {
        const limitnumber = 20;
        const categories = await Category.find({}).limit(limitnumber);

        res.render('categories', { title: 'Cooking Blog- Categories', categories });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
}

// GET Categories By Id

exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId=req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        
        res.render('categories', { title: 'Cooking Blog- Categories', categoryById });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
}

// GET Recipe /:id

exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId=req.params.id;

        const recipe=await Recipe.findById(recipeId);

        res.render('recipe', { title: 'Cooking Blog- Recipe',recipe });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
}



// POST/Search Recipe



exports.searchRecipe = async (req, res) =>{

    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true}})

        res.render('search', { title: 'Cooking Blog- Search',recipe });

    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
    res.render('search', { title: 'Cooking Blog- Search' });
}


// exploreLatest

exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20;
        const recipe=await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)

        res.render('explore-latest', { title: 'Cooking Blog- Explore',recipe });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
}


// exploreRandom

exports.exploreRandom = async (req, res) => {
    try {
        
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        // res.json(recipe)


        res.render('explore-random', { title: 'Cooking Blog- Explore Latest',recipe });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Ocured" });
    }
}

// submitRecipe


exports.submitRecipe = async (req, res) => {
        res.render('submit-recipe', { title: 'Cooking Blog- Submit' });
    
}















// exports.homepage=async(req,res)=>{
//     res.render('index', {title: 'Cooking Blog- Home'});
// }




// async function insertDymmyCategoryData(){

//     try{
//         await Category.insertMany([
//         {
//             "name":"Thai",
//             "image":"thai-food.jpg"
//         },
//         {
//             "name":"Chinese",
//             "image":"chinese-food.jpg"
//         },
//         {
//             "name":"American",
//             "image":"american-food.jpg"
//         },
//         {
//             "name":"Indian",
//             "image":"Indian-food.jpg"
//         },
//         {
//             "name":"Spanish",
//             "image":"spanish-food.jpg"
//         },
//         {
//             "name":"Mexican",
//             "image":"mexican-food.jpg"
//         },



// ]);
//     }catch(error){
//         console.log('err',+ error)
//     }
// }

// insertDymmyCategoryData();






// async function insertDymmyRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Palak Paneer",
//                 "description": `A healthy green coloured paneer recipe prepared mainly from the thick paste of spinach puree. basically, the easy palak paneer recipe hails from the popular north indian cuisine or punjabi cuisine and is typically served with tandoor roti & naan.
//                     Cook and stir onion in hot oil until slightly tender, about 5 minutes.Add garlic, coriander, turmeric, garam masala, red pepper flakes, curry powder, cumin, and salt; cook and stir until fragrant, about 1 minute.Mix spinach, tomatoes, water, and ginger into onion mixture; simmer for 20 minutes. Remove from heat and cool slightly, about 5 minutes.
//                     Transfer spinach mixture to a blender and blend until smooth. Set aside.Heat remaining 1 tablespoon olive oil in the same skillet over medium heat; cook and stir paneer in hot oil until lightly browned, about 5 minutes. Stir in puréed spinach mixture and cook until heated through, 3 to 5 minutes.`,
//                 "ingredients": [
//                     "2 tablespoons olive oil, divided",
//                     "1 onion, diced",
//                     "6 cloves garlic, crushed",
//                     "2 teaspoons ground coriander",
//                     "2 teaspoons ground turmeric",
//                     "2 teaspoons garam masala",
//                     "2 teaspoons red pepper flakes",
//                     "2 teaspoons curry powder",
//                     "2 teaspoons ground cumin",
//                     "1 teaspoon salt",
//                     "2 (10 ounce) packages frozen chopped spinach, thawed and drained",
//                     "3 tomatoes, diced",
//                     "2 tablespoons grated fresh ginger root",
//                     "2 cups cubed paneer",
//                 ],
//                 "category": "Indian",
//                 "image": "palak-paneer.jpg"
//             },
//             {
//                 "name": "Wisconsin Butter Burgers",
//                 "description": `Sprinkle ground beef with seasoned salt and pepper. Pulse mushrooms in a food processor until finely chopped. Add to seasoned beef, mixing lightly but thoroughly. Shape into four 1/2-in.-thick patties.
//                     In a large skillet, heat 2 tablespoons butter over medium heat. Add burgers; cook 6-8 minutes on each side, basting with butter, until a thermometer reads 160°. Remove from heat; keep warm. Add bun tops to skillet; toast until golden brown.
//                     Transfer burgers to bun bottoms. Top each with 1 teaspoon butter. Replace bun tops. Serve with toppings.`,
//                 "ingredients": [
//                     "1 pound lean ground beef (90% lean)",
//                     "1/2 teaspoon seasoned salt",
//                     "1/2 teaspoon pepper",
//                     "1/2 pound fresh mushrooms",
//                     "2 tablespoons plus 4 teaspoons butter, divided",
//                     "4 hamburger buns, split",
//                     "Optional toppings: Tomato slices, lettuce leaves, dill pickle slices, ketchup and mustard",
//                 ],
//                 "category": "American",
//                 "image": "burger.jpg"
//             },
//             {
//                 "name": "Perfect Potstickers",
//                 "description": `Combine the first 11 ingredients in a medium-size mixing bowl (pork through cayenne). Set aside.
//                     To form the dumplings, remove 1 wonton wrapper from the package, covering the others with a damp cloth. Brush 2 of the edges of the wrapper lightly with water. Place 1/2 rounded teaspoon of the pork mixture in the center of the wrapper. Fold over, seal edges, and shape as desired. Set on a sheet pan and cover with a damp cloth. Repeat procedure until all of the filling is gone.
//                     Heat a 12-inch saute pan over medium heat. Brush with vegetable oil once hot. Add 8 to 10 potstickers at a time to the pan and cook for 2 minutes, without touching. Once the 2 minutes are up, gently add 1/3 cup chicken stock to the pan, turn the heat down to low, cover, and cook for another 2 minutes. Remove wontons to a heatproof platter and place in the warm oven. Clean the pan in between batches by pouring in water and allowing the pan to deglaze. Repeat until all the wontons are cooked. Serve immediately.`,
//                 "ingredients": [
//                     "1/2 pound ground pork",
//                     "1/4 cup finely chopped scallions",
//                     "2 tablespoons finely chopped red bell pepper",
//                     "1 egg, lightly beaten",
//                     "2 teaspoons ketchup",
//                     "1 teaspoon yellow mustard",
//                     "2 teaspoons Worcestershire sauce",
//                     "1 teaspoon light brown sugar",
//                     "1 1/2 teaspoons kosher salt",
//                     "1/2 teaspoon freshly ground black pepper",
//                     "1/4 teaspoon cayenne pepper",
//                     "35 to 40 small wonton wrappers",
//                     "1 teaspoon yellow mustard"
//                 ],
//                 "category": "Chinese",
//                 "image": "potStickers.jpeg"
//             },
//             {
//                 "name": "Easy pad Thai",
//                 "description": `Put the noodles in a large heatproof bowl, pour boiling water over them and leave for 4 minutes, then drain and refresh under cold running water.
//                     Put the lime juice, cayenne, sugar and fish sauce in a bowl and mix well. Have all the other ingredients ready by the cooker.
//                     Heat the oil and fry the prawns until warmed through. Add the spring onions and noodles and toss around. Tip in the lime juice mixture, then stir in the beansprouts and half the peanuts and coriander. Cook for 1 minute until everything is heated through.
//                     Pile into a large dish, scatter with the rest of the peanuts and coriander, and serve with lime wedges and sweet chilli sauce.`,
//                 "ingredients": [
//                     "125g (half a 250g pack) rice noodles",
//                     "3 tbsp lime juice about 2 limes",
//                     "½ tsp cayenne pepper",
//                     "2 tsp light muscovado sugar",
//                     "2 tbsp fish sauce (nam pla)",
//                     "2 tbsp vegetable oil",
//                     "200g cooked and peeled tiger prawn, tails left on",
//                     "4 spring onions, sliced",
//                     "140g beansprout",
//                     "25g salted peanut, finely chopped",
//                     "2 tsp light muscovado sugar",
//                 ],
//                 "category": "Thai",
//                 "image": "pad-thai.jpg"
//             },
//             {
//                 "name": "Easy sangria",
//                 "description": `Put the chopped fruit in a bowl and sprinkle over the sugar and cinnamon, then stir to coat. Cover and leave to macerate in the fridge for at least 1 hr, or ideally overnight.
//                 Fill a large jug with ice. Stir the macerated fruit mixture to ensure the sugar is dissolved, then tip into the jug with the wine and brandy. Stir, then top up with the sparkling water and serve.`,
//                 "ingredients": [
//                     "2 oranges, chopped",
//                     "2 pears, chopped",
//                     "2 lemons, 1 chopped, 1 juiced",
//                     "200g red berries, chopped (we used strawberries and cherries)",
//                     "3 tbsp caster sugar",
//                     "1 tsp cinnamon",
//                     "ice",
//                     "750ml bottle light red wine",
//                     "100ml Spanish brandy",
//                     "300ml sparkling water",
//                 ],
//                 "category": "Spanish",
//                 "image": "sangaria.jpeg"
//             },
//             {
//                 "name": "Crab cakes",
//                 "description": ` "\n        Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.\n        For the pie crust, blend the biscuits, sugar and remaining butter in a food processor until the mixture resembles breadcrumbs.\n        Transfer to the pie dish and spread over the bottom and up the sides, firmly pressing down.\n        Bake for 10 minutes, or until lightly browned. Remove from oven and place the dish on a wire rack to cool.\n        For the filling, whisk the egg yolks in a bowl. Gradually whisk in the condensed milk until smooth.\n        Mix in 6 tablespoons of lime juice, then pour the filling into the pie crust and level over with the back of a spoon.\n        Return to the oven for 15 minutes, then place on a wire rack to cool.\n        Once cooled, refrigerate for 6 hours or overnight.\n        To serve, whip the cream until it just holds stiff peaks. Add dollops of cream to the top of the pie, and grate over some lime zest, for extra zing if you like.\n`,
//                 "ingredients": [
//                     "4 large free-range egg yolks",
//                     "400 ml condensed milk",
//                     "5 limes",
                
//                 ],
//                 "category": "American",
//                 "image": "crab-cakes.jpg"
//             },{
//                 "name": "Thai-Chinese-inspired pinch salad",
//                 "description": `Peel and very finely chop the ginger and deseed and finely slice the chilli (deseed if you like). Toast the sesame seeds in a dry frying pan until lightly golden, then remove to a bowl.\n        Mix the prawns with the five-spice and ginger, finely grate in the lime zest and add a splash of sesame oil. Toss to coat, then leave to marinate.\n`,
//                 "ingredients": [
//                     "5 cm piece of ginger",
//                     "1 fresh red chilli",
//                     "25 g sesame seeds",
//                     "24 raw peeled king prawns , from sustainable sources (defrost first, if using frozen)",
//                     "1 pinch Chinese five-spice powder",
                    
//                 ],
//                 "category": "Chinese",
//                 "image": "thai-chinese-inspired-pinch-salad.jpg"
//             },
//             {
//                 "name": "New Chocolate Cake",
//                 "description": `SChocolate Cake Description...`,
//                 "ingredients": [
//                     "Water",
//                      ],
//                 "category": "Mexican",
//                 "image": "mexican-chocolate-cake.jpg"
//             },
            
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();