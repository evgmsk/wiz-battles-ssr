/**
 * project WizBattle
 */

import mongoose from 'mongoose';

const Monster = new mongoose.Schema({
        id: {
            type: Number,
        },
        heads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MonsterHead',
        }],
        body: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MonsterBody',
        }],
        leg: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MonsterLegy',
        }],
    },
    {
        timestamps: true,
    });

const Monsters = mongoose.model('MonsterHead', Monster);
module.exports = Monsters;

