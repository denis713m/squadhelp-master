

db.messages.aggregate(
    [
        {
            $match: {body: {$regex:/\bпаровоз\b/, $options: 'i'}}
        },
        {
            $group: {
                _id: null,
                count: {
                    $sum: 1
                }
            }
        }
    ]
    )