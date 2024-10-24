import { test, expect, request } from '@playwright/test';

test('TCAPI_14:PersonEmployment|Verify Creating employment records under a Person Profile', async () => {
    const apiContext = await request.newContext();
    const logInresponse=await apiContext.post('https://thrive.thrive-dev.com/api/v1/login',{
        data: {
            user: {
                username: "qatesting+charly@thrivetrm.com",
                password: "Changeme1$"
            }
        }
    });
    expect(logInresponse.status()).toBe(200);

     const postresponse = await apiContext.post('https://thrive.thrive-dev.com/api/v1/people',{
        data: {
            "person": {
                "firstName": "Testing01",
                "lastName": "User01",
                "emails": [
                    {
                        "email": "test1010customer.@test.com",
                        "primary": true,
                        "type": null
                    }
                ],
                "names": [
                    {
                        "firstName": "Testing",
                        "lastName": "User01",
                        "type": null,
                        "primary": true
                    }
                ],
                "linkedinUrl": "",
                "phoneNumbers": [
                    {
                        "phoneNumber": "",
                        "primary": true,
                        "type": null
                    }
                ],
                "socialUrls": [
                    {
                        "url": "",
                        "type": null
                    }
                ],
                "employments": [],
                "educations": []
            }
        }
        
    });

    // Verify if the Response status is 200
    test.step('Verify it the Response status is 200',async()=>{
        expect(postresponse.status()).toBe(201);
    });

    //get the response and save it in a variable
    const postResponseBody=await postresponse.json();
    
    //Verify if the response body has an "id" property
    test.step('Verify if the response body has an "id" property',async()=>{
        expect(postResponseBody).toHaveProperty('id');
    })


});
