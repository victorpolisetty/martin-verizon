import json

# read the text file
with open("assets/prompts.txt", "r", encoding='utf-8') as f:
    lines = f.readlines()

# prepare the JSONL file
with open("planData.jsonl", "w", encoding='utf-8') as f:
    # loop over the lines two at a time
    for i in range(0, len(lines), 2):
        user_content = lines[i].strip()
        assistant_content = lines[i + 1].strip()

        data = {
            "messages": [
                {"role": "system", "content": "Martin is a factual chatbot that assists prospective Verizon customers during exploration of Verizon's products and services."},
                {"role": "user", "content": user_content},
                {"role": "assistant", "content": assistant_content}
            ]
        }

        f.write(json.dumps(data))
        f.write('\n') # newline separator for the JSONL format