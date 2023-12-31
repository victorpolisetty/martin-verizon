const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'; // This is for GPT-3, ensure you have the correct endpoint for GPT-4.
const API_KEY_NAME = 'API_KEY';
const API_KEY = process.env[API_KEY_NAME];

if (process.env[API_KEY_NAME] !== undefined) {
  console.log(`The value of ${API_KEY_NAME} is: ${API_KEY}`);
} else {
  console.log(`The environment variable ${API_KEY_NAME} does not exist.`);
}

const conversation = [
    {
        role: "system",
        content: "You are a helpful assistant that can provide information about Verizon products and services."
    },
    {
        role: "user",
        content: `Verizon Unlimited Plans:
        All plans include Canada & Mexico Talk/Text/Data.
        
        Welcome Unlimited:
        Mix & Match: Standalone
        Connectivity: 4G LTE, 5G Nationwide
        Video: 480p
        Fios Discount: $5 off
        Streaming: Apple Music (6 mo.), Apple Arcade (6 mo.), Google Play Pass (6 mo.), Disney+ (6 mo.)
        Price: 1L-$65, 2L-$55, 3L-$40, 4L-$30, 5+L-$25
        
        5G Start:
        Mix & Match: Yes
        Connectivity: 4G LTE, 5G Nationwide
        Hotspot: 5GB
        Video: 480p
        Device Promotions: Base
        Fios Discount: $10 off
        Streaming: Apple Music (6 mo.), Apple Arcade (6 mo.), Google Play Pass (6 mo.), Disney+ (6 mo.)
        Price: 1L-$70, 2L-$60, 3L-$45, 4L-$35, 5+L-$30
        
        5G Play More:
        Mix & Match: Yes
        Connectivity: 4G, 5G Nationwide, 5G Ultra Wideband
        Premium Network Access: 50GB
        Hotspot: 25GB
        Video: 720p
        Device Promotions: Premium
        Verizon Call Filter: Yes
        Fios Discount: $25 off
        5G / LTE Home Discount: 50% off
        Streaming: Apple Music (6 mo.), Apple Arcade, Google Play Pass, Disney+, Hulu, ESPN+
        Price: 1L-$80, 2L-$70, 3L-$55, 4L-$45, 5+L-$40
        
        5G Do More:
        Mix & Match: Yes
        Connectivity: 4G, 5G Nationwide, 5G Ultra Wideband
        Premium Network Access: 50GB
        Hotspot: 25GB
        Video: 720p
        Device Promotions: Premium
        Verizon Call Filter: Yes
        Connected Device Discount: 50% off
        Fios Discount: $25 off
        5G / LTE Home Discount: 50% off
        1 Travel Pass Day: Yes
        Streaming: Apple Music (6 mo.), Apple Arcade (6 mo.), Google Play Pass (6 mo.), Disney+ (6 mo.)
        Cloud Backup: 600GB Verizon Cloud
        Price: 1L-$80, 2L-$70, 3L-$55, 4L-$45, 5+L-$40
        
        5G Get More:
        Mix & Match: Yes
        Connectivity: 4G, 5G Nationwide, 5G Ultra Wideband
        Premium Network Access: Unlimited
        Hotspot: 50GB
        Video: 720p
        Device Promotions: Premium
        Verizon Call Filter: Yes
        Connected Device Discount: 50% off
        Fios Discount: $25 off
        5G / LTE Home Discount: 50% off
        1 Travel Pass Day: Yes
        Streaming: Apple Music, Apple Arcade, Google Play Pass, Disney+, Hulu, ESPN+
        Cloud Backup: 600GB Verizon Cloud
        Price: 1L-$90, 2L-$80, 3L-$65, 4L-$55, 5+L-$50
        
        Apple One Unlimited:
        Mix & Match: Standalone
        Connectivity: 4G, 5G Nationwide, 5G Ultra Wideband
        Premium Network Access: Unlimited
        Hotspot: 50GB
        Video: 720p
        Device Promotions: Premium
        Verizon Call Filter: Yes
        Connected Device Discount: 50% off
        Fios Discount: $25 off
        5G / LTE Home Discount: 50% off
        Streaming: Disney+ (6 mo.), Apple Music, Apple Arcade, Google Play Pass, Apple TV+
        Cloud Backup: 200GB iCloud
        Price: 1L-$90, 2L-$75, 3L-$60, 4L-$50, 5+L-$45
        
        Unlimited Plan Discounts:
        Teacher, Nurse, Military, First Responder: 1L-$10, 2L-$25, 3L-$25, 4+L-$20
        College Student (max 4 years): 1L-$10, 2L-$25
        
        All Plans are also eligible for a $10 discount for Paperless Billing and AutoPay with Debit Card or Checking Account.
        
        Connected Devices:
        Each individual connected device will add an additional cost to the plan.
        Smart Watch: $10
        Jetpack Hotspot: $20
        Cellular Tablet: $20`
    },
    {
        role: "assistant",
        content: `For example, having 3 lines means I will be charged the 3L rate per month.If there is/are connected device(s), the Connected Device Discount for the plan must apply. Remember to apply the connected device discount for the corresponding plan. If I have a connected device, which includes Smart Watches, Jetpack Hotspots, and Cellular Tablets. Then I should get 50% off the price of each of these devices if I am trying to purchase the 5G Do More, 5G Get More, or Apple One Unlimited. To properly format the content with breaks and bolding, you'd want to use a combination of HTML tags such as <br> for line breaks and <ul>/<li> for lists. I would like the text to be formatted as such in HTML. Make the output so that it will be formatted correctly inside a <p> tag. Do not use <b> or <strong> tags`
    }
];

console.log(conversation);


app.use(bodyParser.json());
    // user_input map:
    // keys:
        // user_input["numLines"]: int (1 to 5)
        // user_input["numSmartWatches"]: (0 to 5)
        // user_input["numJetpackHotspots"]: (0 to 5)
        // user_input["numCellularTablets"]: (0 to 5)

        // user_input["qualifyingGroup"]: string
        // user_input["hotspotAmt"]: int
        // user_input["cloudBackup"]: int
        // user_input["connectivity"]: bool
        // user_input["videoStreaming"]: int

        // user_input["serviceFios"]: bool
        // user_input["serviceAppleMusic"]: bool
        // user_input["serviceAppleArcade"]: bool
        // user_input["serviceGooglePlayPass"]: bool
        // user_input["serviceDisney"]: bool
        // user_input["streamingHulu"]: bool
        // user_input["streamingESPN"]: bool
        // user_input["streamingAppleTV"]: bool
app.post('/chat', async (req, res) => {
    const {
        numLines,
        numSmartWatches,
        numJetpackHotspots,
        numCellularTablets,
        qualifyingGroup,
        hotspotAmt,
        cloudBackup,
        connectivity,
        videoStreaming,
        serviceFios,
        serviceAppleMusic,
        serviceAppleArcade,
        serviceGooglePlayPass,
        serviceDisney,
        streamingHulu,
        streamingESPN,
        streamingAppleTV
    } = req.body;

    // Construct user_input based on provided variables
    const user_input = `
    I need a phone plan with the following requirements. Make sure to give the price breakdown to find the cheapest plan:
    - Number of lines: ${numLines}
    - Smart Watches: ${numSmartWatches}
    - Jetpack Hotspots: ${numJetpackHotspots}
    - Cellular Tablets: ${numCellularTablets}
    - Qualifying Group: ${qualifyingGroup}
    - Hotspot Amount: ${hotspotAmt}
    - Cloud Backup: ${cloudBackup}
    - Connectivity: ${connectivity ? 'Yes' : 'No'}
    - Video Streaming Quality: ${videoStreaming}
    ${serviceFios ? '- I use Fios service.\n' : ''}
    ${serviceAppleMusic ? '- I want Apple Music included.\n' : ''}
    ${serviceAppleArcade ? '- I want Apple Arcade included.\n' : ''}
    ${serviceGooglePlayPass ? '- I want Google Play Pass included.\n' : ''}
    ${serviceDisney ? '- I want Disney+ included.\n' : ''}
    ${streamingHulu ? '- I want Hulu included.\n' : ''}
    ${streamingESPN ? '- I want ESPN+ included.\n' : ''}
    ${streamingAppleTV ? '- I want Apple TV+ included.\n' : ''}
    `;

    console.log(user_input);
    
    // Exit condition
    if (user_input.toLowerCase() === 'exit') {
        return res.send('Exiting...');
    }

    conversation.push({ role: "user", content: user_input });

    try {
        const response = await axios.post(OPENAI_API_URL, {
            model: "gpt-4",
            messages: conversation
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        let aiResponse = response.data.choices[0].message.content;
        // Format the response to replace \n with <br> and * with <strong></strong>
        aiResponse = aiResponse.replace(/\n/g, '<br>');
        aiResponse = aiResponse.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
        conversation.push({ role: "assistant", content: aiResponse });

        return res.send({ message: aiResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error occurred while fetching the AI response.');
    }
});

app.listen(3000);

