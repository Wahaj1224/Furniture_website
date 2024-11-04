async function fetchTeam() {
    try {
        const response = await fetch(`http://localhost:5000/api/furni/team`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch team');
        }

        const data = await response.json();
        // Log fetched data
        console.log('Fetched team:', data);
        
        createTeamArray(data);

    } catch (error) {
        console.error('Error fetching team:', error); // Use console.error instead of alert
    }
}

function createTeamArray(data) {
    const teamArray = data.map(item => {
        // Remove the first 5 characters from item.product_image
        const trimmedImageURL = item.simage.slice(4);
        console.log(item.simage);
        console.log('Trimmed Image URL:', trimmedImageURL); // Log the trimmed image URL
        console.log(item.sname);
        
        return {
            frontendImageURL: trimmedImageURL,
            teamName: item.sname || 'No Name',
            teamRole: item.stitle || 'No Role',
            teamDescription: item.sdescription || '',
        };
    });

    // Log the array of objects
    console.log('Team Array:', teamArray);

    displayTeam(teamArray);
}

// function displayTeam(teamArray) {
//     const checkContainer = document.getElementsByClassName('container');  
//     checkContainer.innerHTML = ''; 

//     for (let i = 0; i < teamArray.length; i++) {
//         const item = teamArray[i];
//         const teamDiv = document.createElement('div');
//         teamDiv.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-5');
        
//         teamDiv.innerHTML = `
//             <div class="team-member">
//                 <img src="${item.frontendImageURL}" class="img-fluid team-thumbnail" alt="${item.teamName}">
//                 <h3 class="team-name">${item.teamName}</h3>
//                 <p class="team-role">${item.teamRole}</p>
//                 <p class="team-description">${item.teamDescription}</p>
//             </div>
//         `;

//         checkContainer.appendChild(teamDiv);
//     }
// }

function displayTeam(teamArray) {
    const checkContainer = document.getElementsByClassName('container_CHECK');  

    // const checkContainer = document.getElementById('newme');  


    if (checkContainer.length === 0) {
        console.error('No elements with class "container" found.');
        return;
    }

    const container = checkContainer[0];
    container.innerHTML = ''; // Clear existing content

    for (let i = 0; i < teamArray.length; i++) {
        const item = teamArray[i];
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-5');
        
        teamDiv.innerHTML = `
            <div class="team-member">
                <img src="${item.frontendImageURL}" class="img-fluid team-thumbnail" alt="${item.teamName}">
                <h3 class="team-name">${item.teamName}</h3>
                <p class="team-role">${item.teamRole}</p>
                <p class="team-description">${item.teamDescription}</p>
            </div>
        `;
      
        container.appendChild(teamDiv);
    }
}

// Call the function to fetch and display team members when the page loads
document.addEventListener('DOMContentLoaded', fetchTeam);
